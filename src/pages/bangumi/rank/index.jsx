import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import BangumiRankList from '~/components/FlowList/BangumiRank'
import './index.scss'

class BangumiRank extends Component {
  config = {
    navigationBarTitleText: '榜单'
  }

  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
    }
  }

  onShareAppMessage() {
    return {
      title: '咔哩吧 - 动漫排行榜',
      path: '/pages/index/index',
      imageUrl: 'https://m1.calibur.tv/default-poster?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/400'
    }
  }

  render () {
    return (
      <View className='scroll-page'>
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
