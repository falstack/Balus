import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import MessageMenu from '~/components/FlowList/MessageMenu'
import CustomBar from '~/components/CustomBar'
import rewardIcon from '~/image/icon_reward.png'
import agreeIcon from '~/image/icon_agree.png'
import commentIcon from '~/image/icon_comment.png'
import event from '~/utils/event'
import cache from '~/utils/cache'
import http from '~/utils/http'
import './index.scss'

class MessageEntry extends Component {
  config = {
    navigationBarTitleText: '消息',
    disableScroll: true
  }

  constructor (props) {
    super(props)
    this.state = {
      unread_comment_count: 0,
      unread_follow_count: 0,
      unread_comment_like_count: 0,
      unread_pin_like_count: 0,
      unread_mark_count: 0,
      unread_message_count: 0,
      unread_reward_count: 0,
      unread_share_count: 0,
      list: [
        {
          name: '评论',
          type: 'unread_comment_count',
          icon: commentIcon
        },
        {
          name: '点赞',
          type: 'unread_comment_like_count+unread_pin_like_count',
          icon: agreeIcon
        },
        {
          name: '投食',
          type: 'unread_reward_count',
          icon: rewardIcon
        }
      ]
    }
  }

  componentWillMount() {
    event.on('socket-unread_total', data => {
      this.setState(data)
    })
  }

  componentWillUnmount() {
    event.off('socket-unread_total')
  }

  componentDidShow() {
    this.getUnreadData()
  }

  getUnreadData() {
    http.get('message/total')
      .then(res => {
        this.setState(res)
      })
      .catch(() => {
        const data = cache.get('SOCKET_MSG_unread_total', {})
        this.setState(data)
      })
  }

  handleRedirect(item) {
    http.post('message/unread_clear', {
      type: item.type.split('+').join(',')
    })
    Taro.navigateTo({
      url: `/pages/message/list/index?type=${item.name}`
    })
  }

  clearMessage() {
    http.post('message/unread_clear', {
      type: 'unread_chat_message'
    })
      .then(() => {
        this.refs.menu.refresh()
      })
  }

  render () {
    return (
      <View className='message-show scroll-page'>
        <View className='flex-shrink-0 notice-wrap'>
          {
            this.state.list.map(item => {
              const { type } = item
              let count
              if (type.includes('+')) {
                count = type.split('+').map(key => this.state[key]).reduce((a, b) => a + b)
              } else {
                count = this.state[type]
              }
              return (
                <View key={`${type}-${count}`} onClick={() => {this.handleRedirect(item)}} className='notice-item'>
                  <Image src={item.icon} />
                  <Text>{item.name}</Text>
                  {
                    count ? <View>{count}</View> : ''
                  }
                </View>
              )
            })
          }
        </View>
        <View className='flex-shrink-0 panel-header'>
          <Text className='left'>消息列表</Text>
          <Text className='more' onClick={this.clearMessage}>全部已读</Text>
        </View>
        <View className='flex-grow-1'>
          <View className='scroll-wrap'>
            <MessageMenu ref='menu' />
          </View>
        </View>
        <View className='flex-shrink-0'>
          <CustomBar active={2} />
        </View>
      </View>
    )
  }
}

export default MessageEntry
