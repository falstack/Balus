import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator } from '@tarojs/components'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <View className='index-helper'>
        <Navigator hover-class='none' className='helper-item' url={`/pages/webview/index?url=${encodeURIComponent('app/public/news')}`}>
          <Text className='title'>今日要闻</Text>
          <Text className='intro'>也会是核平的一天</Text>
        </Navigator>
        <Navigator hover-class='none' className='helper-item' url={`/pages/webview/index?url=${encodeURIComponent('app/public/rule')}`}>
          <Text className='title'>社区章程</Text>
          <Text className='intro'>携手共建二次元</Text>
        </Navigator>
        <Navigator hover-class='none' className='helper-item' url={`/pages/webview/index?url=${encodeURIComponent('app/public/rank')}`}>
          <Text className='title'>人气排行</Text>
          <Text className='intro'>入圈必刷的内容</Text>
        </Navigator>
      </View>
    )
  }
}
