import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import BangumiHeader from '~/components/BangumiHeader/index'
import './index.scss'

export default class BlurHeader extends Component {
  constructor (props) {
    super(props)
    const menuRect = Taro.getMenuButtonBoundingClientRect()
    Taro.getSystemInfo({
      success: res => {
        menuRect.right = res.screenWidth - menuRect.right
      }
    })
    this.state = {
      menuRect
    }
  }

  render () {
    const { type, slug, item } = this.props
    const { menuRect } = this.state
    if (!type) {
      return
    }
    return (
      <View className='blur-header'>
        <View className='cover' style={`background-image:url(${item.avatar})`} />
        <View className='mask' />
        <View
          className='wrap'
          style={`padding-top:${menuRect.top}px;padding-left:${menuRect.right}px;padding-right:${menuRect.right}px;padding-bottom:${menuRect.right}px`}
        >
          <View
            className='menu'
            style={`padding-right:${menuRect.right + menuRect.width}px;height:${menuRect.height}px;margin-bottom:${menuRect.right}px`}
          >
            menu
          </View>
          {
            type === 'bangumi' ? <BangumiHeader slug={slug} bangumi={item} /> : ''
          }
        </View>
      </View>
    )
  }
}

BlurHeader.defaultProps = {
  type: '',
  slug: '',
  item: {}
}
