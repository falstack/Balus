import { createStore, createComponent } from './store'
import ListView from '~/components/ListView/index'
import FlowPinItem from '~/components/FlowItem/PinItem'
import { getPins } from '~/utils/api'

function PinList(props) {
  const store = createStore()

  const { state } = store

  return (
    <ListView store={store} params={{
      func: getPins,
      type: props.query && props.query.sort === 'newest' ? 'lastId' : 'seenIds',
      query: props.query
    }}>
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
