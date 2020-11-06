import { createStore, createComponent } from '@flowlist/taro2-react-mobx'
import ListView from '~/components/ListView/index'
import IdolItem from '~/components/ListItem/IdolItem'
import { getSearchList } from '~/utils/api'

function SearchIdolList(props) {
  const store = createStore()

  const { state } = store

  const params = {
    func: getSearchList,
    type: 'page',
    query: {
      type: 'idol',
      q: props.keyword
    }
  }

  return (
    <ListView store={store} params={params}>
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

export default createComponent(SearchIdolList)
