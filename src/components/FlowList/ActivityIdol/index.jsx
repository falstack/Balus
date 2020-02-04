import Taro, { Component } from '@tarojs/taro'
import flowEvent from '../flowEvent'
import flowStore from '../flowStore'
import FlowLoader from '../../FlowLoader/index'
import './index.scss'

@flowStore
@flowEvent
class ActivityIdol extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowReq: {
        url: 'idol/list',
        type: 'page',
        query: {
          sort: 'hottest'
        }
      }
    }
  }

  render () {
    return (
      <FlowLoader flow={this.state} name='trend-idol' />
    )
  }
}

ActivityIdol.defaultProps = {
  slug: 'news',
  flowPrefix: 'index',
  autoload: false
}

export default ActivityIdol
