import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Navigator } from '@tarojs/components'
import './index.scss'

export default class BangumiRankItem extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { item, index } = this.props
    return (
      <Navigator hover-class='none'  url={`/pages/item/show/index?slug=${item.slug}`} className='item-rank-item'>
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
      </Navigator>
    )
  }
}

BangumiRankItem.defaultProps = {
  item: {},
  index: -1
}
