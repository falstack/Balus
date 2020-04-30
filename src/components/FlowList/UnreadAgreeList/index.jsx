import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/mixin/flowEvent'
import flowStore from '~/mixin/flowStore'
import FlowLoader from '~/components/FlowLoader'
import UnreadAgreeItem from '~/components/FlowItem/UnreadAgreeItem'
import './index.scss'

@flowStore
@flowEvent
class UnreadAgreeList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...(this.state || {}),
      flowNamespace: 'unread',
      flowReq: {
        url: 'message/message_agree',
        type: 'page'
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
        {this.state.flow_result.map(item => <UnreadAgreeItem key={item.type + '-' + item.id + '-' + item.user.id} item={item} />)}
      </FlowLoader>
    )
  }
}

UnreadAgreeList.defaultProps = {
  slug: 'agree',
  bottom: true,
  autoload: true
}

export default UnreadAgreeList