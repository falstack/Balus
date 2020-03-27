import Taro, { Component } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import ChatList from '~/components/FlowList/ChatList'
import http from '~/utils/http'
import event from '~/utils/event'
import toast from '~/utils/toast'
import { flowEventKey } from '~/utils/flow'
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

  handleSubmit() {
    const { value } = this.state
    if (!value || !value.trim()) {
      return
    }
    const content = [
      {
        type: 'paragraph',
        data: {
          text: value.trim()
        }
      }
    ]
    const { channel } = this.$router.params
    http.post('message/send', { channel, content })
      .then(msg => {
        this.setState({
          value: ''
        })
        event.emit(flowEventKey('message-room', 'append', channel), msg)
      })
      .catch((err) => {
        toast.info(err.message)
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
              onConfirm={this.handleSubmit}
            />
          </View>
        </View>
      </View>
    )
  }
}
