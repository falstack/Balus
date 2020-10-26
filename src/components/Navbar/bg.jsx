import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { wrapStyle, coreStyle, shimStyle } from './utils'
import utils from '~/utils'
import mixin from './mixin'
import './index.scss'

@mixin
export default class extends Component {
  static options = {
    addGlobalClass: true
  }

  render () {
    return (
      <View className='navbar'>
        <View className="navbar__header">
          <View
            style={wrapStyle(this.state)}
            className="navbar__wrap"
          >
            <View
              style={coreStyle(this.state)}
              className='navbar__core has-bg'
            >
              <View className="iconfont ic-back"/>
            </View>
          </View>
          <View
            style={shimStyle(this.state)}
            className='navbar__shim has-bg'
          >
            <View className="navbar__bg">
              <Image
                className='image'
                mode="aspectFill"
                src={utils.resize(this.props.background, { mode: 0, width: 375 })}
              />
            </View>
            <View className="navbar__mask" />
            {this.props.children}
          </View>
        </View>
      </View>
    )
  }
}
