import Taro, { Component } from '@tarojs/taro'
import flowEvent from '../flowEvent'
import flowStore from '../flowStore'
import FlowLoader from '../../FlowLoader/index'
import './index.scss'

@flowStore
@flowEvent
class NewsPin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowReq: {
        url: 'bangumi/pins',
        type: 'lastId',
        query: {
          slug: '54xzu',
          sort: 'newest',
          time: 'all',
          is_up: 0
        }
      }
    }
  }

  render () {
    return (
      <FlowLoader flow={this.state} name='flow-pin' showBangumi={false} />
    )
  }
}

NewsPin.defaultProps = {
  slug: 'news',
  autoload: false
}

export default NewsPin
