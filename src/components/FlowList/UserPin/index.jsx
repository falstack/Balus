import Taro, { Component } from '@tarojs/taro'
import flowEvent from '../flowEvent'
import flowStore from '../flowStore'
import FlowLoader from '../../FlowLoader/index'
import './index.scss'

@flowStore
@flowEvent
class UserIdol extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowReq: {
        url: 'user/pins',
        type: 'page',
        query: {
          slug: this.props.userSlug
        }
      }
    }
  }

  render () {
    return (
      <FlowLoader flow={this.state} name='flow-pin' others={{ showUser: false }} />
    )
  }
}

UserIdol.defaultProps = {
  slug: 'pin',
  userSlug: '',
  autoload: true
}

export default UserIdol
