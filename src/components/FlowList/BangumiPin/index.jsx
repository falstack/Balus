import Taro, { Component } from '@tarojs/taro'
import flowEvent from '../flowEvent'
import flowStore from '../flowStore'
import FlowLoader from '../../FlowLoader/index'
import './index.scss'

@flowStore
@flowEvent
class RecommendedPin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowReq: {
        url: 'bangumi/pins',
        type: 'seenIds',
        query: {
          slug: this.props.slug,
          sort: 'active',
          time: 'all',
          is_up: 0
        }
      }
    }
  }

  render () {
    return (
      <FlowLoader flow={this.state} name='flow-pin' />
    )
  }
}

RecommendedPin.defaultProps = {
  slug: 'recommended',
  autoload: true
}

export default RecommendedPin
