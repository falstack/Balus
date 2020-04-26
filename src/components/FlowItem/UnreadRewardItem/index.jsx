import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

class UnreadRewardItem extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { item } = this.props

    return (
      <View className='u-r-item'>
        {item}
      </View>
    )
  }
}

UnreadRewardItem.defaultProps = {
  item: {}
}

export default UnreadRewardItem
