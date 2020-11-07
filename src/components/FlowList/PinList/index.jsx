import Taro, { PureComponent } from '@tarojs/taro'
import { createStore, reactive } from '@flowlist/taro2-react-mobx'
import ListView from '~/components/ListView'
import FlowPinItem from '~/components/ListItem/PinItem'
import { getPins } from '~/utils/api'

@reactive
export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.store = createStore()
    this.params = {
      func: getPins,
      type: props.query && props.query.sort === 'newest' ? 'sinceId' : 'seenIds',
      query: props.query,
      uniqueKey: 'slug'
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  render () {
    return (
      <ListView store={this.store} params={this.params}>
        {
          this.store.state.result.map(item => (
            <FlowPinItem
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
