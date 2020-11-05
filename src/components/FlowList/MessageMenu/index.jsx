import { createStore, createComponent } from '@flowlist/taro2-react-mobx'
import ListView from '~/components/ListView/index'
import UserEmailItem from '~/components/ListItem/UserEmailItem'
import { getMessageMenu } from '~/utils/api'

function MessageMenu() {
  const store = createStore()

  const { state } = store

  const params = {
    func: getMessageMenu,
    type: 'page'
  }

  // componentDidMount() {
  //   event.on('socket-message-menu', ({ data }) => {
  //     this.setState({
  //       flow_result: data
  //     })
  //   })
  // }

  return (
    <ListView store={store} params={params}>
      {
        state.result.map((item, index) => (
          <UserEmailItem
            key={item.channel}
            first={index === 0}
            item={item}
          />
        ))
      }
    </ListView>
  )
}

export default createComponent(MessageMenu)
