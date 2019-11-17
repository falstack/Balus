import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import './index.scss'

export default class IdolBottom extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { idol } = this.props
    return (
      <View className='idol-bottom'>
        <View className='idol-bottom__content'>
          <Text className='idol-bottom__price'>￥{idol.stock_price}/股</Text>
          <Button className='idol-bottom__btn idol-bottom__buy'>立即入股</Button>
        </View>
        <View className='idol-bottom__shim' />
      </View>
    )
  }
}

IdolBottom.defaultProps = {
  idol: {}
}
