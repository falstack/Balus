import { createStore, createComponent } from '@flowlist/taro2-react-mobx'
import ListView from '~/components/ListView/index'
import { getUnreadRewardList } from '~/utils/api'

function UnreadRewardList(props) {
  const store = createStore()

  const { state } = store

  const params = {
    func: getUnreadRewardList,
    type: 'sinceId'
  }

  return (
    <ListView store={store} params={params}>
      {state.result}
    </ListView>
  )
}

export default createComponent(UnreadRewardList)
