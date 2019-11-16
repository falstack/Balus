import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Navigator } from '@tarojs/components'
import './index.scss'

export default class ActiveIdolItem extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { idol, index } = this.props
    return (
      <Navigator hover-class='none' url={`/pages/idol/show/index?slug=${idol.slug}`} className={`active-idol__wrap ${index % 2 ? 'is-odd' : ''} ${index < 2 ? 'is-first' : ''}`}>
        <View className='active-idol'>
          <View className='active-idol__avatar__wrap'>
            <Image className='active-idol__avatar' src={idol.avatar} mode='aspectFit'></Image>
          </View>
          <View className='active-idol__panel'>
            <Text className='active-idol__title'>{idol.bangumi.name}</Text>
            <Text className='active-idol__title'>{idol.name}</Text>
            <View className='active-idol__footer'>
              <Text className='active-idol__price'>￥{idol.market_price}</Text>
              <Text className='active-idol__fans'>{idol.fans_count}人入股</Text>
            </View>
          </View>
        </View>
      </Navigator>
    )
  }
}

ActiveIdolItem.defaultProps = {
  index: 0,
  idol: {
    bangumi: {},
    lover: {}
  },
}
