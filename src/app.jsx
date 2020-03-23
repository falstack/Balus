import Taro, { Component } from '@tarojs/taro'
import http from '~/utils/http'
import cache from '~/utils/cache'
import { step_6_get_user_roles } from '~/utils/login'
import Index from './pages/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/idol/show/index',
      'pages/user/home/index',
      'pages/user/show/index',
      'pages/user/login/index',
      'pages/bangumi/show/index',
      'pages/bangumi/rank/index',
      'pages/message/entry/index',
      'pages/message/chat/index',
      'pages/search/index',
      'pages/pin/show/index',
      'pages/webview/index',
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fb7299',
      navigationBarTitleText: '咔哩吧',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
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
          pagePath: 'pages/bangumi/rank/index',
          text: '分区',
          iconPath: 'image/tab_2.png',
          selectedIconPath: 'image/tab_2_selected.png'
        },
        {
          pagePath: 'pages/message/entry/index',
          text: '消息',
          iconPath: 'image/tab_3.png',
          selectedIconPath: 'image/tab_3_selected.png'
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
    this.getCurrentUser()
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
        const data = JSON.parse(msg.data)
        if (data.channel === 'unread_total') {
          const total = data.unread_message_total + data.unread_notice_total
          if (total) {
            Taro.setTabBarBadge({
              index: 2,
              text: total.toString()
            })
          } else {
            Taro.removeTabBarBadge({
              index: 2
            })
          }
        }
        cache.set(`SOCKET_MSG_${data.channel}`, data, false)
      })
    })
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
