import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator, ScrollView } from '@tarojs/components'
import BangumiTopImage from '~/image/bangumi-top.jpeg'
import BangumiReleaseImage from '~/image/bangumi-release.jpeg'
import './index.scss'

class BangumiRank extends Component {
  config = {
    navigationBarTitleText: '分区'
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  onShareAppMessage() {
    return {
      title: '咔哩吧 - 分区',
      path: '/pages/index/index',
      imageUrl: 'https://m1.calibur.tv/default-poster?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/400'
    }
  }

  render () {
    return (
      <View className='bangumi-rank scroll-page'>
        <View className='flex-shrink-0 pgc-list'>
          <ScrollView className='scroll-view' scrollX>
            <Navigator
              hover-class='none'
              className='pgc-item'
              url={`/pages/webview/index?url=${encodeURIComponent('bangumi/list/release')}`}
            >
              <View>
                <Image src={BangumiReleaseImage} mode='aspectFill' />
                <Text>新番时间表</Text>
              </View>
            </Navigator>
            <Navigator
              hover-class='none'
              className='pgc-item'
              url={`/pages/webview/index?url=${encodeURIComponent('bangumi/list/top250')}`}
            >
              <View>
                <Image src={BangumiTopImage} mode='aspectFill' />
                <Text>日漫TOP250</Text>
              </View>
            </Navigator>
          </ScrollView>
        </View>
        <View className='flex-shrink-0'>
          <Text>热门分区</Text>
        </View>
        <View className='flex-grow-1'>
          热门的板块（动漫/游戏）
        </View>
      </View>
    )
  }
}

export default BangumiRank
