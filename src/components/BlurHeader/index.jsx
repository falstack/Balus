import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import utils from '~/utils'
import classNames from 'classnames'
import menuRect from '~/mixin/menuRect'
import './index.scss'

@menuRect
class BlurHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state
    }
  }

  render () {
    const menuRect = this.state.menuRect
    if (!menuRect) {
      return
    }
    const { blur } = this.props
    const imageSrc = utils.resize(this.props.background, { mode: 0, width: 375 })
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
            <AtIcon value='chevron-left' color='#fff' onClick={utils.back} />
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

export default BlurHeader
