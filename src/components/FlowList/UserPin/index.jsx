import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/mixins/flowEvent'
import flowStore from '~/mixins/flowStore'
import FlowLoader from '~/components/FlowLoader'
import FlowPinItem from '~/components/FlowItem/FlowPinItem'
import './index.scss'

@flowStore
@flowEvent
class UserIdol extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowNamespace: 'user',
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
      <FlowLoader
        launch
        flow={this.state}
        slug={this.props.slug}
        namespace={this.state.flowNamespace}
      >
        {
          this.state.flow_result.map(item => (
            <FlowPinItem
              taroKey={item.slug}
              key={item.slug}
              item={item}
              params={{ showUser: false }}
            />
          ))
        }
      </FlowLoader>
    )
  }
}

UserIdol.defaultProps = {
  slug: '',
  userSlug: '',
  autoload: true
}

export default UserIdol
