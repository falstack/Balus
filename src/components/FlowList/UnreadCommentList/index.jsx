import { createStore, createComponent } from '@flowlist/taro2-react-mobx'
import ListView from '~/components/ListView/index'
import UnreadCommentItem from '~/components/ListItem/UnreadCommentItem'
import { getUnreadCommentList } from '~/utils/api'

function UnreadCommentList(props) {
  const store = createStore()

  const { state } = store

  const params = {
    func: getUnreadCommentList,
    type: 'sinceId'
  }

  return (
    <ListView store={store} params={params}>
      {
        state.result.map(item => (
          <UnreadCommentItem
            key={item.id}
            item={item}
          />
        ))
      }
    </ListView>
  )
}

export default createComponent(UnreadCommentList)
