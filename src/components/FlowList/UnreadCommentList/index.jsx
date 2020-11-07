import Taro, { PureComponent } from '@tarojs/taro'
import { createStore, reactive } from '@flowlist/taro2-react-mobx'
import ListView from '~/components/ListView'
import UnreadCommentItem from '~/components/ListItem/UnreadCommentItem'
import { getUnreadCommentList } from '~/utils/api'

@reactive
export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.store = createStore()
    this.params = {
      func: getUnreadCommentList,
      type: 'sinceId'
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
            <UnreadCommentItem
              key={item.id}
              item={item}
            />
          ))
        }
      </ListView>
    )
  }
}
