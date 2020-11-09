import Taro, { PureComponent } from '@tarojs/taro'
import { createStore, reactive } from '@flowlist/taro2-react-mobx'
import { inject } from '@tarojs/mobx'
import ListView from '~/components/ListView'
import ChatItem from '~/components/ListItem/ChatItem'
import event from '~/utils/event'
import { getChatList } from '~/utils/api'
import './index.scss'

@inject('user')
@reactive
export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.store = createStore()
    this.params = {
      func: getChatList,
      type: 'sinceId',
      query: {
        channel: props.slug
      }
    }
  }

  componentDidMount () {
    event.on('CHAT_LIST_UPDATE', this.watchMessage.bind(this))
  }

  componentWillUnmount () {
    event.off('CHAT_LIST_UPDATE', this.watchMessage.bind(this))
  }

  watchMessage = (value) => {
    this.store.updateState({
      ...this.params,
      method: 'push',
      value
    })
  }

  render () {
    const { user } = this.props

    return (
      <ListView
        store={this.store}
        append={true}
        bottom={false}
        params={this.params}
      >
        {
          this.store.state.result.map(item => (
            <ChatItem
              id={`chat-${item.id}`}
              key={item.id}
              item={item}
              is_mine={user.info.slug === item.sender_slug}
            />
          ))
        }
      </ListView>
    )
  }
}
