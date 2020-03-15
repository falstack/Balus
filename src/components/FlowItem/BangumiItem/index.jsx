import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

export default class BangumiRankItem extends Component {
  constructor (props) {
    super(props)
  }

  clickBangumi(bangumi) {
    this.$preload('bangumi', bangumi)
    Taro.navigateTo({
      url: `/pages/bangumi/show/index?slug=${bangumi.slug}`,
    })
  }

  render () {
    const { item, index } = this.props

    return (
      <View className='bangumi-item' onClick={() => {this.clickBangumi(item)}}>
        <Image className='avatar' src={item.avatar} mode='aspectFill' />
        {
          index < 0 ? '' :
            <View className='order'>
              {index + 1}
            </View>
        }
        {
          Number(item.score) ?
            <View className='score'>
              <Text className='number'>{item.score}</Text>
              <Text className='fen'>分</Text>
            </View> : ''
        }
        <View className='content'>
          <Text className='title'>{item.name}</Text>
        </View>
      </View>
    )
  }
}

BangumiRankItem.defaultProps = {
  item: {},
  index: -1
}
