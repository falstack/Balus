import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import cache from '~/utils/cache'
import event from '~/utils/event'
import http from '~/utils/http'
import UserPanel from './panel/UserPanel'
import UserTable from './table/UserTable'
import './index.scss'

export default class extends Component {
  config = {
    navigationStyle: 'custom'
  }

  constructor(props) {
    super(props)
    this.state = {
      user: cache.get('USER', null)
    }
  }

  componentWillMount() {
    if (!this.state.user) {
      Taro.redirectTo({
        url: '/pages/user/login/index'
      })
      return
    }
    event.on('update-user', () => {
      this.refreshUser()
    })
  }

  componentWillUnmount() {
    event.off('update-user')
  }

  componentDidShow() {
    this.refreshUser()
  }

  onShareAppMessage() {
    const { user } = this.state
    if (!user) {
      return null
    }
    return {
      title: user.nickname,
      path: `/pages/user/show/index?slug=${user.slug}`,
      imageUrl: `${user.avatar}?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/400`
    }
  }

  refreshUser() {
    const user = cache.get('USER', null)
    if (user) {
      http.get('user/patch', {
        slug: user.slug
      })
        .then(data => {
          this.setState({
            user: {
              ...user,
              ...data
            }
          })
        })
    } else {
      this.setState({
        user
      })
    }
  }

  userLogout() {
    http.post('door/logout')
    cache.remove('JWT-TOKEN')
    cache.remove('USER')
    Taro.reLaunch({
      url: '/pages/index/index'
    })
  }

  render() {
    const { user } = this.state
    if (user === null) {
      return
    }

    return (
      <View className='user-home'>
        <UserPanel user={user} />
        <View className='hr' />
        <UserTable user={user} />
        <View className='logout'>
          <Button onClick={this.userLogout}>
            退出登录
          </Button>
        </View>
      </View>
    )
  }
}
