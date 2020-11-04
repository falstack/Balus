import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { inject, observer } from '@tarojs/mobx'
import SignedPanel from './signed'
import GuestPanel from './guest'

@inject('user')
@observer
export default class extends Component {
  render() {
    const { user: { isLogin } } = this.props

    return (
      <View>
        {isLogin ? <SignedPanel /> : <GuestPanel />}
      </View>
    )
  }
}
