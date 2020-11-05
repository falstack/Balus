import { createStore, createComponent } from '@flowlist/taro2-react-mobx'
import ListView from '~/components/ListView/index'
import BangumiItem from '~/components/ListItem/BangumiItem'
import { getSearchList } from '~/utils/api'

function SearchBangumiList() {
  const store = createStore()

  const { state } = store

  const params = {
    func: getSearchList,
    type: 'page',
    query: {
      type: 'bangumi'
    }
  }

  return (
    <ListView store={store} params={params}>
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

export default createComponent(SearchBangumiList)
