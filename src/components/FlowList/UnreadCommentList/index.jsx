import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/mixin/flowEvent'
import flowStore from '~/mixin/flowStore'
import FlowLoader from '~/components/FlowLoader'
import UnreadCommentItem from '~/components/FlowItem/UnreadCommentItem'
import './index.scss'

@flowStore
@flowEvent
class UnreadCommentList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...(this.state || {}),
      flowNamespace: 'unread',
      flowReq: {
        url: 'message/message_pin_comment',
        type: 'lastId'
      }
    }
  }

  render () {
    return (
      <FlowLoader
        launch
        flow={this.state}
        slug={this.props.slug}
        namespace={this.state.flowNamespace}
      >
        {this.state.flow_result.map(item => <UnreadCommentItem key={item.id} item={item} />)}
      </FlowLoader>
    )
  }
}

UnreadCommentList.defaultProps = {
  slug: 'comment',
  bottom: true,
  autoload: true
}

export default UnreadCommentList
