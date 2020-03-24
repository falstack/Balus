import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import ChatList from '~/components/FlowList/ChatList'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { channel } = this.$router.params
    if (!channel) {
      return
    }

    return (
      <View>
        <ChatList slug={channel} />
      </View>
    )
  }
}
