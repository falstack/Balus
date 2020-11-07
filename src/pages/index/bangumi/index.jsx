import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator, ScrollView } from '@tarojs/components'
import Navbar from '~/components/Navbar/text'
import BangumiList from '~/components/FlowList/BangumiList'
import BangumiTopImage from '~/image/bangumi-top.jpeg'
import BangumiReleaseImage from '~/image/bangumi-release.jpeg'
import './index.scss'

class BangumiRank extends Component {
  static options = {
    addGlobalClass: true
  }

  render () {
    return (
      <View className='bangumi-page scroll-page'>
        <View className='flex-shrink-0'>
          <Navbar title={'番剧'} />
        </View>
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
            <View className='scroll-view'>
              <BangumiList query={{ from: 'hot', sort: 'hottest' }} />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default BangumiRank
