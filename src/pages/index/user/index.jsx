import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import SignedPanel from './signed'
import GuestPanel from './guest'
import { connect } from '@tarojs/redux'

@connect(store => ({
  isLogin: store.user.isLogin
}))
export default class extends Component {
  render() {
    return (
      <View>
        {this.props.isLogin ? <SignedPanel /> : <GuestPanel />}
      </View>
    )
  }
}
