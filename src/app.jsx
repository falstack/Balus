import Taro, { Component } from '@tarojs/taro'
import http from '~/utils/http'
import cache from '~/utils/cache'
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
      'pages/user/list/index',
      'pages/bangumi/show/index',
      'pages/bangumi/list/index',
      'pages/search/index',
      'pages/webview/index',
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '萌市',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#333333',
      selectedColor: '#fb7299',
      backgroundColor: '#ffffff',
      borderStyle: 'white',
      position: 'bottom',
      list: [
        {
          pagePath: 'pages/index/index',
          text: '偶像',
          iconPath: 'images/icon_home_default.png',
          selectedIconPath: 'images/icon_home_active.png'
        },
        {
          pagePath: 'pages/bangumi/list/index',
          text: '番剧',
          iconPath: 'images/icon_home_default.png',
          selectedIconPath: 'images/icon_home_active.png'
        },
        {
          pagePath: 'pages/user/list/index',
          text: '名人堂',
          iconPath: 'images/icon_home_default.png',
          selectedIconPath: 'images/icon_home_active.png'
        },
        {
          pagePath: 'pages/user/home/index',
          text: '我的',
          iconPath: 'images/icon_mine_default.png',
          selectedIconPath: 'images/icon_mine_active.png'
        }
      ]
    }
  }

  componentDidMount() {
    this.getCurrentUser()
  }

  getCurrentUser() {
    const token = cache.get('JWT-TOKEN')
    if (!token) {
      return
    }
    http
      .post('door/get_user_info')
      .then(data => {
        cache.set('USER', data)
      })
      .catch(err => {
        cache.remove('USER')
        if (err.code === 401) {
          cache.remove('JWT-TOKEN')
        }
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
