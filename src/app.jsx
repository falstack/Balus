import Taro, { Component } from '@tarojs/taro'
import { onError, Provider, inject, observer } from '@tarojs/mobx'
import cache from '~/utils/cache'
import socket from '~/utils/socket'
import store from '~/store'
import Index from './pages/index'
import './app.scss'

onError(error => {
  console.log('mobx global error listener:', error)
})

@inject('user')
@observer
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
    this.props.user.userLogin()
    this.connectSocket()
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
