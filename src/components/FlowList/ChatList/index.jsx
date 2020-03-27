import Taro, { PureComponent } from '@tarojs/taro'
import flowEvent from '~/mixin/flowEvent'
import flowStore from '~/mixin/flowStore'
import FlowLoader from '~/components/FlowLoader'
import ChatItem from '~/components/FlowItem/ChatItem'
import cache from '~/utils/cache'
import './index.scss'

@flowStore
@flowEvent
class ChatList extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowNamespace: 'message-room',
      flowReq: {
        url: 'message/history',
        type: 'lastId',
        query: {
          is_up: 1,
          channel: props.slug
        }
      }
    }
  }

  render () {
    const user = cache.get('USER', null)
    if (!user) {
      return
    }

    return (
      <FlowLoader
        launch
        top
        bottom={false}
        flow={this.state}
        slug={this.props.slug}
        namespace={this.state.flowNamespace}
      >
        {
          this.state.flow_result.map(item => (
            <ChatItem is_mine={user.slug === item.sender_slug} key={item.id} item={item} />
          ))
        }
      </FlowLoader>
    )
  }
}

ChatList.defaultProps = {
  slug: '',
  autoload: true
}

export default ChatList
