import Taro, { PureComponent } from '@tarojs/taro'
import { createStore, reactive } from '@flowlist/taro2-react-mobx'
import ListView from '~/components/ListView'
import IdolItem from '~/components/ListItem/IdolItem'
import { getIdols } from '~/utils/api'

@reactive
export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.store = createStore()
    this.params = {
      func: getIdols,
      type: props.query && props.query.sort === 'newest' ? 'sinceId' : 'seenIds',
      query: props.query,
      uniqueKey: 'slug'
    }
  }

  componentWillMount () { }

  componentWillUnmount () { }

  render () {
    return (
      <ListView store={this.store} params={this.params}>
        {
          this.store.state.result.map(item => (
            <IdolItem
              key={item.slug}
              item={item}
              params={this.props.params}
            />
          ))
        }
      </ListView>
    )
  }
}
