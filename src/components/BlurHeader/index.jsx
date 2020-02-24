import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import helper from '~/utils/helper'
import './index.scss'

export default class BlurHeader extends Component {
  constructor (props) {
    super(props)
  }

  back() {
    Taro.navigateBack().then(() => {}).catch(() => {
      Taro.switchTab({
        url: '/pages/index/index'
      })
    })
  }

  render () {
    const { background, collapsed } = this.props
    const menuRect = helper.getMenuRect()
    return (
      <View className={`blur-header ${collapsed ? 'collapsed' : ''}`}>
        <View className='cover' style={`background-image:url(${background})`} />
        <View className='mask' />
        <View
          className='wrap'
          style={`padding-top:${menuRect.top}px;padding-left:${menuRect.right}px;padding-right:${menuRect.right}px;padding-bottom:${menuRect.right}px`}
        >
          <View
            className='menu'
            style={`padding-right:${menuRect.right + menuRect.width}px;height:${menuRect.height}px;margin-bottom:${menuRect.right}px`}
          >
            <AtIcon value='chevron-left' color='#fff' onClick={this.back} />
          </View>
          <View className='main'>
            {this.props.children}
          </View>
        </View>
      </View>
    )
  }
}

BlurHeader.defaultProps = {
  collapsed: false,
  background: ''
}
