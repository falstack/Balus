import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { wrapStyle, coreStyle, shimStyle } from './utils'
import mixin from './mixin'

@mixin
export default class extends Component {
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
              className='navbar__core'
            >
              {
                this.props.showBack && <View className="iconfont ic-back"/>
              }
              <View className="title">
                {this.props.children}
              </View>
            </View>
          </View>
          <View
            style={shimStyle(this.state)}
            className='navbar__shim'
          />
        </View>
      </View>
    )
  }
}
