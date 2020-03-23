import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/mixin/flowEvent'
import flowStore from '~/mixin/flowStore'
import FlowLoader from '~/components/FlowLoader'
import UserEmailItem from '~/components/FlowItem/UserEmailItem'
import './index.scss'

@flowStore
@flowEvent
class MessageMenu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowNamespace: 'email-message',
      flowReq: {
        url: 'message/menu',
        type: 'page'
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
        {
          this.state.flow_result.map((item, index) => (
            <UserEmailItem key={item.channel} first={index === 0} item={item} />
          ))
        }
      </FlowLoader>
    )
  }
}

MessageMenu.defaultProps = {
  slug: '',
  force: true,
  autoload: false
}

export default MessageMenu
