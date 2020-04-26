import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator, ScrollView } from '@tarojs/components'
import BangumiList from '~/components/FlowList/BangumiList/index'
import BangumiTopImage from '~/image/bangumi-top.jpeg'
import BangumiReleaseImage from '~/image/bangumi-release.jpeg'
import CustomBar from '~/components/CustomBar'
import './index.scss'

class BangumiRank extends Component {
  config = {
    navigationBarTitleText: '分区',
  }

  constructor (props) {
    super(props)
    this.state = {
      ...(this.state || {}),
    }
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
        <View className='flex-shrink-0 ugc-title'>
          <Text>热门分区</Text>
        </View>
        <View className='flex-grow-1'>
          <View className='scroll-wrap'>
            <BangumiList from='hot' sort='hottest' autoload />
          </View>
        </View>
        <View className='flex-shrink-0'>
          <CustomBar active={1} />
        </View>
      </View>
    )
  }
}

export default BangumiRank
