import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import utils from '~/utils'
import './index.scss'

export default class TrendIdolItem extends Component {
  constructor (props) {
    super(props)
  }

  handleClick(idol) {
    this.$preload('idol', idol)
    Taro.navigateTo({
      url: `/pages/idol/show/index?slug=${idol.slug}`,
    })
  }

  render () {
    const { idol, index, inBangumi } = this.props
    return (
      <View className='trend-idol' onClick={() => this.handleClick(idol)}>
        <Image className='trend-idol__avatar' src={idol.avatar} mode='aspectFill' />
        {
          index >= 0 ? (
            <View className='trend-idol__order'>
              {index + 1}
            </View>
          ) : ''
        }
        <View className='trend-idol__content'>
          <Text className='trend-idol__title'>{inBangumi ? '' : idol.bangumi.name} {idol.name}</Text>
          <Text className='trend-idol__intro'>{idol.intro}</Text>
          <View className='trend-idol__footer'>
            <Text className='trend-idol__price'>总分数：{utils.calculate(idol.market_price)}</Text>
            <Text className='trend-idol__fans'>{idol.fans_count}人投票</Text>
          </View>
        </View>
      </View>
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
