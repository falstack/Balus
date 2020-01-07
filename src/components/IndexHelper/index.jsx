import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index-helper'>
        <View className='helper-item'>
          <Text className='title'>今日要闻</Text>
          <Text className='intro'>也会是核平的一天</Text>
        </View>
        <View className='helper-item'>
          <Text className='title'>社区章程</Text>
          <Text className='intro'>携手共建二次元</Text>
        </View>
        <View className='helper-item'>
          <Text className='title'>人气排行</Text>
          <Text className='intro'>入圈必刷的内容</Text>
        </View>
      </View>
    )
  }
}
