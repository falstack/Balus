import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import MessageMenu from '~/components/FlowList/MessageMenu'
import CustomBar from '~/components/CustomBar'
import rewardIcon from '~/image/icon_reward.png'
import noticeIcon from '~/image/icon_notice.png'
import agreeIcon from '~/image/icon_agree.png'
import commentIcon from '~/image/icon_comment.png'
import event from '~/utils/event'
import cache from '~/utils/cache'
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
      unread_like_count: 0,
      unread_mark_count: 0,
      unread_message_count: 0,
      unread_reward_count: 0,
      unread_share_count: 0,
    }
  }

  componentWillMount() {
    event.on('socket-unread_total', data => {
      this.setState(data)
    })
    const data = cache.get('SOCKET_MSG_unread_total', {})
    this.setState(data)
  }

  componentWillUnmount() {
    event.off('socket-unread_total')
  }

  render () {
    return (
      <View className='message-show scroll-page'>
        <View className='flex-shrink-0 notice-wrap'>
          <View className='notice-item'>
            <Image src={commentIcon} />
            <Text>评论</Text>
            {
              this.state.unread_comment_count
                ? <View>{this.state.unread_comment_count}</View>
                : ''
            }
          </View>
          <View className='notice-item'>
            <Image src={agreeIcon} />
            <Text>点赞</Text>
            {
              this.state.unread_like_count
                ? <View>{this.state.unread_like_count}</View>
                : ''
            }
          </View>
          <View className='notice-item'>
            <Image src={rewardIcon} />
            <Text>投食</Text>
            {
              this.state.unread_reward_count
                ? <View>{this.state.unread_reward_count}</View>
                : ''
            }
          </View>
          <View className='notice-item'>
            <Image src={noticeIcon} />
            <Text>关注</Text>
            {
              this.state.unread_follow_count
                ? <View>{this.state.unread_follow_count}</View>
                : ''
            }
          </View>
        </View>
        <View className='flex-grow-1'>
          <View className='scroll-wrap'>
            <MessageMenu />
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
