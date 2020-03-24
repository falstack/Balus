import Taro, { Component } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import ChatList from '~/components/FlowList/ChatList'
import './index.scss'

export default class extends Component {
  config = {
    disableScroll: true
  }

  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleInput(evt) {
    this.setState({
      value: evt.detail.value
    })
  }

  render () {
    const { channel } = this.$router.params
    if (!channel) {
      return
    }

    const { value } = this.state

    return (
      <View className='message-chat scroll-page'>
        <View className='flex-grow-1'>
          <View className='scroll-wrap'>
            <ChatList slug={channel} />
          </View>
        </View>
        <View className='flex-shrink-0 input-wrap'>
          <View className='input-box'>
            <Input
              value={value}
              confirmHold
              type='text'
              placeholder='输入新消息'
              confirmType='send'
              onInput={this.handleInput}
            />
          </View>
        </View>
      </View>
    )
  }
}
