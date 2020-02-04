import Taro, { Component } from '@tarojs/taro'
import flowEvent from '../flowEvent'
import flowStore from '../flowStore'
import FlowLoader from '../../FlowLoader/index'
import './index.scss'

@flowStore
@flowEvent
class SearchBangumi extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowReq: {
        url: 'search/mixin',
        type: 'page',
        query: {
          type: this.props.slug,
          q: this.props.keywords
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

SearchBangumi.defaultProps = {
  slug: 'idol',
  flowPrefix: 'search',
  autoload: false
}

export default SearchBangumi
