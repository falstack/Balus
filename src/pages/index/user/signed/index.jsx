import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import CustomBar from '~/custom-tab-bar'
import UserPanel from './panel/UserPanel'
import UserTable from './table/UserTable'
import { delUserInfo } from '~/store/actions/user'
import './index.scss'

@connect(({ user }) => ({
  user
}), (dispatch) => ({
  delUserInfo () {
    dispatch(delUserInfo())
  }
}))
export default class extends Component {
  static options = {
    addGlobalClass: true
  }

  componentDidShow() {
    this.refreshUser()
  }

  onShareAppMessage() {
    const { user } = this.props
    if (!user) {
      return null
    }
    return {
      title: user.nickname,
      path: `/pages/user/show/index?slug=${user.slug}`,
      imageUrl: `${user.avatar}?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/400`
    }
  }

  refreshUser() {}

  userLogout() {
    this.props.delUserInfo()
    Taro.reLaunch({
      url: '/pages/index/index'
    })
  }

  render() {
    const { user } = this.props
    if (user === null) {
      return
    }

    return (
      <View className='user-home scroll-page'>
        <View className='flex-shrink-0'>
          <UserPanel user={user} />
        </View>
        <View className='flex-grow-1'>
          <View className='hr' />
          <UserTable user={user} />
          <View className='logout'>
            <Button onClick={this.userLogout}>
              退出登录
            </Button>
          </View>
        </View>
        <View className='flex-shrink-0'>
          <CustomBar active={3} />
        </View>
      </View>
    )
  }
}