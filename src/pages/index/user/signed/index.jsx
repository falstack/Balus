import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { inject, observer } from '@tarojs/mobx'
import event from '~/utils/event'
import CustomBar from '~/custom-tab-bar'
import UserPanel from './panel'
import UserTable from './table'
import './index.scss'

@inject('user')
@observer
export default class extends Component {
  static options = {
    addGlobalClass: true
  }

  componentDidMount() {
    this.props.user.refreshUser()
    event.on('TAB_SWITCH', this.onTabSwitch.bind(this))
  }

  componentWillUnmount() {
    event.off('TAB_SWITCH', this.onTabSwitch.bind(this))
  }

  onTabSwitch(index) {
    if (index !== 3) {
      return
    }
    this.props.user.refreshUser()
  }

  userLogout() {
    this.props.user.userLogout()
    Taro.reLaunch({
      url: '/pages/index/index'
    })
  }

  render() {
    return (
      <View className='user-home scroll-page'>
        <View className='flex-shrink-0'>
          <UserPanel />
        </View>
        <View className='flex-grow-1'>
          <View className='hr' />
          <UserTable />
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
