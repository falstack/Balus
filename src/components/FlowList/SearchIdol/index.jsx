import Taro, { PureComponent } from '@tarojs/taro'
import { createStore, reactive } from '@flowlist/taro2-react-mobx'
import ListView from '~/components/ListView'
import IdolItem from '~/components/ListItem/IdolItem'
import { getSearchList } from '~/utils/api'

@reactive
export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.store = createStore()
    this.params = {
      func: getSearchList,
      type: 'page',
      query: {
        type: 'idol',
        q: props.keyword
      }
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
            <IdolItem
              key={item.slug}
              item={item}
            />
          ))
        }
      </ListView>
    )
  }
}
