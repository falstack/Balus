import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/mixins/flowEvent'
import flowStore from '~/mixins/flowStore'
import FlowLoader from '~/components/FlowLoader'
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
