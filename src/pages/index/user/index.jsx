import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { inject, observer } from '@tarojs/mobx'
import Navbar from '~/components/Navbar/text'
import SignedPanel from './signed'
import GuestPanel from './guest'
import './index.scss'

@inject('user')
@observer
export default class extends Component {
  static options = {
    addGlobalClass: true
  }

  render() {
    const { user: { isGuest } } = this.props

    return (
      <View className='user-home'>
        <Navbar />
        <View className="iphone-top-shim" />
        {isGuest ? <GuestPanel /> : <SignedPanel />}
      </View>
    )
  }
}
