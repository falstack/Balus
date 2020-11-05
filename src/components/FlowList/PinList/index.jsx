import { createStore, createComponent } from '@flowlist/taro2-react-mobx'
import ListView from '~/components/ListView/index'
import FlowPinItem from '~/components/ListItem/PinItem'
import { getPins } from '~/utils/api'

function PinList(props) {
  const store = createStore()

  const { state } = store

  const params = {
    func: getPins,
    type: props.query && props.query.sort === 'newest' ? 'sinceId' : 'seenIds',
    query: props.query,
    uniqueKey: 'slug'
  }

  return (
    <ListView store={store} params={params}>
      {
        state.result.map(item => (
          <FlowPinItem
            key={item.slug}
            item={item}
            params={props.params}
          />
        ))
      }
    </ListView>
  )
}

export default createComponent(PinList)
