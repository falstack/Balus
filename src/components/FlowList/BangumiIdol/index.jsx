import Taro, { Component } from '@tarojs/taro'
import flowEvent from '../flowEvent'
import flowStore from '../flowStore'
import FlowLoader from '../../FlowLoader/index'
import './index.scss'

@flowStore
@flowEvent
class Bangumi extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowReq: {
        url: 'bangumi/idols',
        type: 'page',
        query: {
          slug: this.props.bangumiSlug
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

Bangumi.defaultProps = {
  slug: 'idol',
  bangumiSlug: '',
  flowPrefix: 'bangumi',
  autoload: false
}

export default Bangumi
