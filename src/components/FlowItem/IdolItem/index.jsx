import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
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

  clickBangumi(bangumi) {
    this.$preload('bangumi', bangumi)
    Taro.navigateTo({
      url: `/pages/bangumi/show/index?slug=${bangumi.slug}`,
    })
  }

  clickUser(user) {
    this.$preload('user', user)
    Taro.navigateTo({
      url: `/pages/user/show/index?slug=${user.slug}`,
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
      <View className={`idol-item i_${index}`} onClick={() => this.handleClick(item)}>
        {
          index >= 0 ? (
            <View className='order'>
              {index + 1}
            </View>
          ) : ''
        }
        <View className="avatar">
          <Image className='idol' src={utils.resize(item.avatar, { width: 60 })} mode='aspectFill' />
          {
            state.showUser && item.lover ? (
              <Image
                className='user'
                src={utils.resize(item.lover.avatar, { width: 25 })}
                mode='aspectFill'
                onClick={() => {this.clickUser(item.lover)}}
              />
            ) : ''
          }
        </View>
        <View className='content'>
          <View className='body'>
            <Text className='name'>{item.name}</Text>
            <View className='stat'>
              {item.fans_count}人应援 · {item.stock_price}团子/股
            </View>
            {
              state.showBangumi ? (
                <View
                  className='bangumi'
                  url={`/pages/bangumi/show/index?slug=${item.bangumi.slug}`}
                  onClick={() => {this.clickBangumi(item.bangumi)}}
                >{item.bangumi.name}</View>
              ) : ''
            }
          </View>
          <View className='control'>
            <Button className='btn'>{item.market_price}</Button>
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
