import Taro, { PureComponent } from '@tarojs/taro'
import { createStore, reactive } from '@flowlist/taro2-react-mobx'
import ListView from '~/components/ListView'
import UserEmailItem from '~/components/ListItem/UserEmailItem'
import event from '~/utils/event'
import { getMessageMenu } from '~/utils/api'

// TODO：socket-message-menu 只告知更新，不返回更新的内容
@reactive
export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.store = createStore()
    this.params = {
      func: getMessageMenu,
      type: 'page'
    }
  }

  componentDidMount() {
    event.on('socket-message-menu', this.refreshList.bind(this))
    event.on('TAB_SWITCH', this.refreshList.bind(this))
    event.on('REFRESH_MESSAGE_MENU', this.refreshList.bind(this))
  }

  componentWillUnmount () {
    event.off('socket-message-menu', this.refreshList.bind(this))
    event.off('TAB_SWITCH', this.refreshList.bind(this))
    event.off('REFRESH_MESSAGE_MENU', this.refreshList.bind(this))
  }

  refreshList = (index) => {
    if (index === 2) {
      return
    }
    this.store.refresh(this.params)
  }

  render () {
    return (
      <ListView store={this.store} params={this.params}>
        {
          this.store.state.result.map((item, index) => (
            <UserEmailItem
              key={item.channel}
              first={index === 0}
              item={item}
            />
          ))
        }
      </ListView>
    )
  }
}
