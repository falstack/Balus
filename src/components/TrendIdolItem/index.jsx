import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Navigator } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import utils from '~/utils'
import './index.scss'

export default class TrendIdolItem extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { idol, index, inBangumi } = this.props
    return (
      <Navigator hover-class='none' url={`/pages/idol/show/index?slug=${idol.slug}`} className='trend-idol'>
        <Image className='trend-idol__avatar' src={idol.avatar} mode='aspectFill' />
        {
          index < 0 ? '' :
          index ?
          <View className='trend-idol__order'>
            {index + 1}
          </View>
            :
          <View className='trend-idol__icon'>
            <AtIcon value='sketch' color='#fff' />
          </View>
        }
        <View className='trend-idol__content'>
          <Text className='trend-idol__title'>{inBangumi ? '' : idol.bangumi.name} {idol.name}</Text>
          <Text className='trend-idol__intro'>{idol.intro}</Text>
          <View className='trend-idol__footer'>
            <Text className='trend-idol__price'>总分数：{utils.calculate(idol.market_price)}</Text>
            <Text className='trend-idol__fans'>{idol.fans_count}人投票</Text>
          </View>
        </View>
      </Navigator>
    )
  }
}

TrendIdolItem.defaultProps = {
  index: -1,
  idol: {
    bangumi: {},
    lover: null
  },
  inBangumi: false
}
