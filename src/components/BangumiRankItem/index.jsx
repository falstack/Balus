import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Navigator } from '@tarojs/components'
import './index.scss'

export default class BangumiRankItem extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { bangumi, index } = this.props
    return (
      <Navigator hover-class='none'  url={`/pages/bangumi/show/index?slug=${bangumi.slug}`}className='bangumi-rank-item'>
        <Image className='avatar' src={bangumi.avatar} mode='aspectFill' />
        {
          index < 0 ? '' :
            <View className='order'>
              {index + 1}
            </View>
        }
        {
          Number(bangumi.score) ?
            <View className='score'>
              <Text className='number'>{bangumi.score}</Text>
              <Text className='fen'>分</Text>
            </View> : ''
        }
        <View className='content'>
          <Text className='title'>{bangumi.name}</Text>
        </View>
      </Navigator>
    )
  }
}

BangumiRankItem.defaultProps = {
  bangumi: {},
  index: -1
}
