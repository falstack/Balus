import Taro, { PureComponent } from '@tarojs/taro'
import { createStore, reactive } from '@flowlist/taro2-react-mobx'
import ListView from '~/components/ListView'
import UnreadAgreeItem from '~/components/ListItem/UnreadAgreeItem'
import { getUnreadAgreeList } from '~/utils/api'

@reactive
export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.store = createStore()
    this.params = {
      func: getUnreadAgreeList,
      type: 'page'
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  render () {
    const { store, store: { state } } = this

    return (
      <ListView store={store} params={this.params}>
        {
          state.result.map(item => (
            <UnreadAgreeItem
              key={item.type + '-' + item.id + '-' + item.user.id}
              item={item}
            />
          ))
        }
      </ListView>
    )
  }
}
