import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import menuRect from '~/mixin/menuRect'
import BangumiRankList from '~/components/FlowList/BangumiRank'
import './index.scss'

@menuRect
class BangumiRank extends Component {
  config = {
    navigationBarTextStyle: 'white',
    navigationStyle: 'custom'
  }

  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
    }
  }

  onShareAppMessage() {
    return {
      title: '萌市，动漫排行榜',
      path: '/pages/index/index',
      imageUrl: 'https://m1.calibur.tv/default-poster?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/400'
    }
  }

  render () {
    const { menuRect } = this.state
    if (!menuRect) {
      return
    }

    return (
      <View className='bangumi-rank scroll-page'>
        <View className="header flex-shrink-0" style={`height:${menuRect.header}px;padding-top:${menuRect.top}px`}>
          榜单
        </View>
        <View className='flex-grow-1'>
          <View className='scroll-wrap'>
            <BangumiRankList />
          </View>
        </View>
      </View>
    )
  }
}

export default BangumiRank
