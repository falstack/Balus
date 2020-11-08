import Taro, { PureComponent } from '@tarojs/taro'
import { createStore, reactive } from '@flowlist/taro2-react-mobx'
import ListView from '~/components/ListView'
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
    return (
      <ListView store={this.store} params={this.params}>
        {
          this.store.state.result.map((item, index) => (
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
