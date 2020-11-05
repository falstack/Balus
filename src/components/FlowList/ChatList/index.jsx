import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { inject, observer } from '@tarojs/mobx'
import ChatItem from '~/components/ListItem/ChatItem'
import './index.scss'

@inject('user')
@observer
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

  render () {
    const { user } = this.props
    const { flow_result } = this.state
    if (!user.isLogin || !flow_result.length) {
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
                is_mine={user.info.slug === item.sender_slug}
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
