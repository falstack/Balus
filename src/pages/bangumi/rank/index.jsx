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
      title: '咔哩吧 - 分区',
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
          <Navigator hover-class='none' url={`/pages/webview/index?url=${encodeURIComponent('bangumi/list/top250')}`}>
            动漫TOP250
          </Navigator>
        </View>
        <Text>热门</Text>
        <View>
          热门的板块（动漫/游戏）
        </View>
      </View>
    )
  }
}

export default BangumiRank
