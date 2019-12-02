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
      <Navigator hover-class='none'  url={`/pages/bangumi/show/index?slug=${bangumi.slug}`}className='bangumi-rank'>
        <Image className='bangumi-rank__avatar' src={bangumi.avatar} mode='aspectFill'></Image>
        {
          index < 0 ? '' :
            <View className='bangumi-rank__order'>
              {index + 1}
            </View>
        }
        {
          Number(bangumi.score) ?
            <View className='bangumi-rank__score'>
              <Text className='bangumi-rank__score__number'>{bangumi.score}</Text>
              <Text className='bangumi-rank__score__fen'>分</Text>
            </View> : ''
        }
        <View className='bangumi-rank__content'>
          <Text className='bangumi-rank__title'>{bangumi.name}</Text>
        </View>
      </Navigator>
    )
  }
}

BangumiRankItem.defaultProps = {
  bangumi: {},
  index: -1
}
