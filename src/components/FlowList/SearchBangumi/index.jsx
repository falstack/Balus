import Taro, { Component } from '@tarojs/taro'
import searchEvent from '../searchEvent'
import flowStore from '../flowStore'
import FlowLoader from '../../FlowLoader/index'
import './index.scss'

@flowStore
@searchEvent
class SearchBangumi extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowReq: {
        url: 'search/mixin',
        type: 'page',
        query: {
          type: this.props.type,
          q: this.props.keywords
        }
      }
    }
  }

  render () {
    return (
      <FlowLoader flow={this.state} name='bangumi-rank' />
    )
  }
}

SearchBangumi.defaultProps = {
  type: 'bangumi'
}

export default SearchBangumi
