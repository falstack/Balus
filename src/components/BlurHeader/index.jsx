import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import helper from '~/utils/helper'
import classNames from 'classnames'
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
    const menuRect = helper.getMenuRect()
    const { blur } = this.props
    const imageSrc = helper.resize(this.props.background, { mode: 0, width: 375 })
    return (
      <View className={classNames('blur-header', { 'collapsed': this.props.collapsed }, { 'blur': blur })}>
        <View className='cover' style={blur ? `background-image:url(${imageSrc})` : ''}>
          {
            blur ? '' : <Image src={imageSrc} mode='aspectFill' />
          }
        </View>
        <View className='mask' />
        <View className='wrap' style={`padding:${menuRect.top}px ${menuRect.right}px ${menuRect.right * 2}px ${menuRect.right}px`}>
          <View
            className='menu'
            style={`padding-right:${menuRect.right + menuRect.width}px;height:${menuRect.height}px;margin-bottom:${menuRect.right}px`}
          >
            <AtIcon value='chevron-left' color='#fff' onClick={this.back} />
          </View>
          <View
            className='main'
            style={`padding:0px ${menuRect.right}px`}
          >
            {this.props.children}
          </View>
        </View>
        <View className='head' style={`height:${menuRect.header}px;padding:${menuRect.top}px ${menuRect.width + menuRect.right * 2}px ${menuRect.right}px ${menuRect.right}px;`}>
          <AtIcon value='chevron-left' color='#fff' onClick={this.back} />
          <Text className='line'>|</Text>
          <Text className='title'>{this.props.title}</Text>
        </View>
      </View>
    )
  }
}

BlurHeader.defaultProps = {
  blur: false,
  collapsed: false,
  background: '',
  title: ''
}
