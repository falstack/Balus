import Taro, { Component } from '@tarojs/taro'
import { Provider, connect } from '@tarojs/redux'
import http from '~/utils/http'
import cache from '~/utils/cache'
import socket from '~/utils/socket'

import configStore from './store'
import Index from './pages/index'
import './app.scss'
import { getUserInfo } from './store/actions/user'

const store = configStore()

@connect(({ user }) => ({
  user
}), (dispatch) => ({
  getUserInfo () {
    dispatch(getUserInfo())
  }
}))
class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/idol/show/index',
      'pages/user/home/index',
      'pages/user/show/index',
      'pages/bangumi/show/index',
      'pages/message/chat/index',
      'pages/message/list/index',
      'pages/search/index',
      'pages/pin/show/index',
      'pages/webview/index',
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '咔哩吧',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      custom: true,
      color: '#A7BAC7',
      selectedColor: '#14171A',
      backgroundColor: '#ffffff',
      borderStyle: 'white',
      position: 'bottom',
      list: [
        {
          pagePath: 'pages/index/index',
          text: '首页',
          iconPath: 'image/tab_1.png',
          selectedIconPath: 'image/tab_1_selected.png'
        },
        {
          pagePath: 'pages/user/home/index',
          text: '我的',
          iconPath: 'image/tab_4.png',
          selectedIconPath: 'image/tab_4_selected.png'
        }
      ]
    }
  }

  componentWillMount() {
    const token = cache.get('JWT-TOKEN')
    if (!token) {
      return
    }
    this.props.getUserInfo()
    this.connectSocket()
  }

  getCurrentUser() {
    http
      .post('door/get_user_info')
      .then(data => {
        cache.set('USER', data)
        step_6_get_user_roles()
      })
      .catch(err => {
        cache.remove('USER')
        if (err.code === 401) {
          cache.remove('JWT-TOKEN')
        }
      })
  }

  connectSocket() {
    const token = cache.get('JWT-TOKEN')
    if (!token) {
      return
    }
    Taro.connectSocket({
      url: `wss://api.calibur.tv/ws?token=${token}`,
      fail: () => {
        cache.set('WEB_SOCKET', null, false)
        setTimeout(() => {
          this.connectSocket(token)
        }, 10000)
      }
    }).then(task => {
      task.onOpen(() => {
        cache.set('WEB_SOCKET', task, false)
      })
      task.onClose(() => {
        cache.set('WEB_SOCKET', null, false)
        setTimeout(() => {
          this.connectSocket(token)
        }, 10000)
      })
      task.onMessage((msg) => {
        socket.dispatch(JSON.parse(msg.data))
      })
    })
  }

  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
