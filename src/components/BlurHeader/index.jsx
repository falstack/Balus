import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import BangumiHeader from '~/components/BangumiHeader/index'
import helper from '~/utils/helper'
import './index.scss'

export default class BlurHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuRect: helper.getMenuRect()
    }
  }

  back() {
    Taro.navigateBack().then(() => {}).catch(() => {
      Taro.switchTab({
        url: '/pages/index/index'
      })
    })
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
            <AtIcon value='chevron-left' color='#fff' onClick={this.back} />
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
