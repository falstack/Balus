import Taro, { PureComponent } from '@tarojs/taro'
import { createStore, reactive } from '@flowlist/taro2-react-mobx'
import ListView from '~/components/ListView/index'
import UserEmailItem from '~/components/ListItem/UserEmailItem'
import { getMessageMenu } from '~/utils/api'

// TODO：事件监听
// TODO：reload 组件 show 的时候，刷新数据
@reactive
export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.store = createStore()
    this.params = {
      func: getMessageMenu,
      type: 'page'
    }
  }

  componentWillMount () { }

  // componentDidMount() {
  //   event.on('socket-message-menu', ({ data }) => {
  //     this.setState({
  //       flow_result: data
  //     })
  //   })
  // }

  componentWillUnmount () { }

  render () {
    const { store, store: { state } } = this

    return (
      <ListView store={store} params={this.params}>
        {
          state.result.map(item => (
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
}
