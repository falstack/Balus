import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/mixin/flowEvent'
import flowStore from '~/mixin/flowStore'
import FlowLoader from '~/components/FlowLoader'
import './index.scss'

@flowStore
@flowEvent
class UnreadUserFollowList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...(this.state || {}),
      flowNamespace: 'unread',
      flowReq: {
        url: 'message/message_user_follow',
        type: 'lastId'
      }
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <FlowLoader
        launch
        flow={this.state}
        slug={this.props.slug}
        namespace={this.state.flowNamespace}
      >
        {this.state.flow_result}
      </FlowLoader>
    )
  }
}

UnreadUserFollowList.defaultProps = {
  slug: 'user_follow',
  bottom: true,
  autoload: true
}

export default UnreadUserFollowList
