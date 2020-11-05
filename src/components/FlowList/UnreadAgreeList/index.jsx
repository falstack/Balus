import { createStore, createComponent } from '@flowlist/taro2-react-mobx'
import ListView from '~/components/ListView/index'
import UnreadAgreeItem from '~/components/ListItem/UnreadAgreeItem'
import { getUnreadAgreeList } from '~/utils/api'

function UnreadAgreeList(props) {
  const store = createStore()

  const { state } = store

  const params = {
    func: getUnreadAgreeList,
    type: 'page'
  }

  return (
    <ListView store={store} params={params}>
      {
        state.result.map(item => (
          <UnreadAgreeItem
            key={item.type + '-' + item.id + '-' + item.user.id}
            item={item}
          />
        ))
      }
    </ListView>
  )
}

export default createComponent(UnreadAgreeList)
