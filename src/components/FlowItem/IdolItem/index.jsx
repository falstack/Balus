import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import utils from '~/utils'
import './index.scss'

class IdolItem extends Component {
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
    const { item, index, params } = this.props
    const state = {
      showUser: true,
      showBangumi: true,
      showTime: false,
      ...params
    }
    return (
      <View className='idol-item' onClick={() => this.handleClick(item)}>
        <Image className='idol-item__avatar' src={item.avatar} mode='aspectFill' />
        {
          index >= 0 ? (
            <View className='idol-item__order'>
              {index + 1}
            </View>
          ) : ''
        }
        <View className='idol-item__content'>
          <Text className='idol-item__title'>{state.showBangumi ? tem.bangumi.name : ''} {item.name}</Text>
          <Text className='idol-item__intro'>{item.intro}</Text>
          <View className='idol-item__footer'>
            <Text className='idol-item__price'>总分数：{utils.calculate(item.market_price)}</Text>
            <Text className='idol-item__fans'>{item.fans_count}人投票</Text>
          </View>
        </View>
      </View>
    )
  }
}

IdolItem.defaultProps = {
  index: -1,
  item: {
    bangumi: {},
    lover: null
  },
  params: {
    showBangumi: true
  }
}

export default IdolItem
