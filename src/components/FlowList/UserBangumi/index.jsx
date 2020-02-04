import Taro, { Component } from '@tarojs/taro'
import flowEvent from '../flowEvent'
import flowStore from '../flowStore'
import FlowLoader from '../../FlowLoader/index'
import './index.scss'

@flowStore
@flowEvent
class UserBangumi extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowReq: {
        url: 'user/like_bangumi',
        type: 'page',
        query: {
          slug: this.props.userSlug
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

UserBangumi.defaultProps = {
  slug: 'bangumi',
  userSlug: '',
  flowPrefix: 'user',
  autoload: false
}

export default UserBangumi
