import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

class UnreadCommentItem extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { item } = this.props

    return (
      <View className='u-c-item'>
        {item}
      </View>
    )
  }
}

UnreadCommentItem.defaultProps = {
  item: {}
}

export default UnreadCommentItem
