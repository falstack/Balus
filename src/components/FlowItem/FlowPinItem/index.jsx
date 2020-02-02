import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class FlowPinItem extends Component {
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
    return (
      <View>
        <Text>text</Text>
      </View>
    )
  }
}

FlowPinItem.defaultProps = {
  item: {}
}
