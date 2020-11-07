import Taro, { PureComponent } from '@tarojs/taro'
import { createStore, reactive } from '@flowlist/taro2-react-mobx'
import ListView from '~/components/ListView/index'
import BangumiItem from '~/components/ListItem/BangumiItem'
import { getHotBangumis, getUserLikeBangumis } from '~/utils/api'

@reactive
export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.store = createStore()
    this.params = {
      func: props.type === 'user' ? getUserLikeBangumis : getHotBangumis,
      type: 'page',
      query: props.query
    }
  }

  componentWillMount () { }

  componentWillUnmount () { }

  render () {
    const { store, store: { state } } = this

    return (
      <ListView store={store} params={this.params}>
        {
          state.result.map(item => (
            <BangumiItem
              key={item.slug}
              item={item}
            />
          ))
        }
      </ListView>
    )
  }
}
