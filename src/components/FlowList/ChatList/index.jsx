import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import flowEvent from '~/mixin/flowEvent'
import flowStore from '~/mixin/flowStore'
import ChatItem from '~/components/FlowItem/ChatItem'
import cache from '~/utils/cache'
import event from '~/utils/event'
import { flowEventKey } from '~/utils/flow'
import './index.scss'

@flowStore
@flowEvent
class ChatList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...(this.state || {}),
      flowNamespace: 'message-room',
      flowReq: {
        url: 'message/history',
        type: 'lastId',
        query: {
          is_up: 1,
          changing: 'id',
          channel: props.slug
        }
      }
    }
  }

  static options = {
    addGlobalClass: true
  }

  handleTop() {
    if (this.state.flow_noMore) {
      return
    }
    event.emit(flowEventKey(this.state.flowNamespace, 'top', this.props.slug))
  }

  render () {
    const user = cache.get('USER', null)
    const { flow_result } = this.state
    if (!user || !flow_result.length) {
      return
    }

    return (
      <View className='scroll-wrap'>
        <ScrollView
          scrollY
          className='scroll-view'
          onScrollToUpper={this.handleTop}
          scrollIntoView={`chat-${flow_result[flow_result.length - 1].id}`}
          scrollAnchoring
        >
          {
            flow_result.map(item => (
              <ChatItem
                id={`chat-${item.id}`}
                key={item.id}
                item={item}
                is_mine={user.slug === item.sender_slug}
              />
            ))
          }
        </ScrollView>
      </View>
    )
  }
}

ChatList.defaultProps = {
  slug: '',
  before: true,
  append: true,
  autoload: true
}

export default ChatList
