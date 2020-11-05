import { createStore, createComponent } from '@flowlist/taro2-react-mobx'
import ListView from '~/components/ListView/index'
import IdolItem from '~/components/ListItem/IdolItem'
import { getIdols } from '~/utils/api'

function IdolList(props) {
  const store = createStore()

  const { state } = store

  const params = {
    func: getIdols,
    type: props.query && props.query.sort === 'newest' ? 'sinceId' : 'seenIds',
    query: props.query,
    uniqueKey: 'slug'
  }

  return (
    <ListView store={store} params={params}>
      {
        state.result.map(item => (
          <IdolItem
            key={item.slug}
            item={item}
            params={props.params}
          />
        ))
      }
    </ListView>
  )
}

export default createComponent(IdolList)
