import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { wrapStyle, coreStyle, shimStyle } from './utils'
import navbar from '~/mixin/navbar'

@navbar
export default class extends Component {
  static options = {
    addGlobalClass: true
  }

  componentDidMount () {
    this.calcMenuRect()
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
              className='navbar__core'
            >
              {
                this.props.showBack && <View className="iconfont ic-back"/>
              }
              <View className="title">
                {
                  this.props.title
                    ? <Text className='page_title'>{this.props.title}</Text>
                    : this.props.children
                }
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
