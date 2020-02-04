import Taro, { Component } from '@tarojs/taro'
import flowEvent from '../flowEvent'
import flowStore from '../flowStore'
import FlowLoader from '../../FlowLoader/index'
import './index.scss'

@flowStore
@flowEvent
class BangumiPin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowReq: {
        url: 'bangumi/pins',
        type: 'seenIds',
        query: {
          slug: this.props.bangumiSlug,
          sort: 'active',
          time: 'all',
          is_up: 0
        }
      }
    }
  }

  render () {
    return (
      <FlowLoader flow={this.state} name='flow-pin' others={{ showBangumi: false }} />
    )
  }
}

BangumiPin.defaultProps = {
  slug: '',
  bangumiSlug: '',
  flowPrefix: 'bangumi',
  autoload: true
}

export default BangumiPin
