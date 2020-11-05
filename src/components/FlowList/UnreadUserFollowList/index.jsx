import { createStore, createComponent } from '@flowlist/taro2-react-mobx'
import ListView from '~/components/ListView/index'
import { getUnreadUserFollowList } from '~/utils/api'

function UnreadUserFollowList(props) {
  const store = createStore()

  const { state } = store

  const params = {
    func: getUnreadUserFollowList,
    type: 'sinceId'
  }

  return (
    <ListView store={store} params={params}>
      {state.result}
    </ListView>
  )
}

export default createComponent(UnreadUserFollowList)
