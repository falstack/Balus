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
        url: 'user/idols',
        type: 'page',
        query: {
          slug: this.props.userSlug
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

UserIdol.defaultProps = {
  slug: 'idol',
  userSlug: '',
  autoload: false
}

export default UserIdol
