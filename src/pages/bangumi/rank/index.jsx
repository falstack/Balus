import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator } from '@tarojs/components'
import './index.scss'

class BangumiRank extends Component {
  config = {
    navigationBarTitleText: '分区'
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
      <View>
        <Text>番剧</Text>
        <View>
          <Navigator hover-class='none' url={`/pages/webview/index?url=${encodeURIComponent('bangumi/list/release')}`}>
            新番时间表
          </Navigator>
          <Navigator hover-class='none' url={`/pages/webview/index?url=${encodeURIComponent('bangumi/list/hot')}`}>
            热门番剧
          </Navigator>
          <Navigator hover-class='none' url={`/pages/webview/index?url=${encodeURIComponent('bangumi/list/top250')}`}>
            动漫TOP250
          </Navigator>
        </View>
      </View>
    )
  }
}

export default BangumiRank
