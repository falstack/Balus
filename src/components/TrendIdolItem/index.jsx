import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'

export default class TrendIdolItem extends Component {
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
    const { idol, index } = this.props
    return (
      <View className='trend-idol'>
        <Image className='trend-idol__avatar' src={idol.avatar} mode='aspectFit'></Image>
        {
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
          <Text className='trend-idol__title'>{idol.bangumi.name} {idol.name}</Text>
          <Text className='trend-idol__intro'>{idol.intro}</Text>
          <View className='trend-idol__footer'>
            <Text className='trend-idol__price'>￥{idol.market_price}</Text>
            <Text className='trend-idol__fans'>{idol.fans_count}人入股</Text>
          </View>
        </View>
      </View>
    )
  }
}

TrendIdolItem.defaultProps = {
  index: 0,
  idol: {
    bangumi: {},
    lover: {}
  },
}
