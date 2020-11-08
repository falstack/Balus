import Taro, { PureComponent } from '@tarojs/taro'
import { createStore, reactive } from '@flowlist/taro2-react-mobx'
import ListView from '~/components/ListView'
import UnreadRewardItem from '~/components/ListItem/UnreadRewardItem'
import { getUnreadRewardList } from '~/utils/api'

@reactive
export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.store = createStore()
    this.params = {
      func: getUnreadRewardList,
      type: 'sinceId'
    }
  }

  componentWillMount () { }

  componentWillUnmount () { }

  render () {
    return (
      <ListView store={this.store} params={this.params}>
        {
          this.store.state.result.map(item => (
            <UnreadRewardItem
              key={item.id}
              item={item}
            />
          ))
        }
      </ListView>
    )
  }
}
