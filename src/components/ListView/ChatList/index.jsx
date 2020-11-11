import Taro, { PureComponent } from '@tarojs/taro'
import { createStore, reactive } from '@flowlist/taro2-react-mobx'
import { ScrollView } from '@tarojs/components'
import { inject } from '@tarojs/mobx'
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
      },
      callback: this.callback
    }
    this.state = {
      lastId: ''
    }
  }

  componentDidMount () {
    event.on('CHAT_LIST_UPDATE', this.watchMessage.bind(this))
    this.store.initData(this.params)
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

  handleTop = () => {
    this.store.loadBefore(this.params)
  }

  callback = (res) => {
    this.setState({
      lastId: res.data.result.length ? `chat-${res.data.result[res.data.result.length - 1].id}` : ''
    })
  }

  render () {
    const { user } = this.props

    return (
      <ScrollView
        className='chat-list'
        scrollY={true}
        scrollX={false}
        scrollAnchoring
        onScrollToUpper={this.handleTop}
        scrollIntoView={this.state.lastId}
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
      </ScrollView>
    )
  }
}
