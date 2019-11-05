import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import cache from '~/utils/cache'
import event from '~/utils/event'
import http from '~/utils/http'
import { AtButton } from 'taro-ui'
import UserSign from './sign/UserSign'
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

  componentWillMount() {}

  componentDidMount() {
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

  componentDidHide() {}

  refreshUser() {
    this.setState({
      user: cache.get('USER', null)
    })
  }

  userLogout() {
    http.post('door/logout')
    cache.remove('JWT-TOKEN')
    cache.remove('USER')
    this.refreshUser()
  }

  render() {
    const { user } = this.state
    if (user === null) {
      return <UserSign />
    }

    return (
      <View className='user-home'>
        <UserPanel user={user} />
        <View className='hr' />
        <UserTable user={user} />
        <View className='logout'>
          <AtButton type='primary' onClick={this.userLogout}>
            退出登录
          </AtButton>
        </View>
      </View>
    )
  }
}
