import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/mixin/flowEvent'
import flowStore from '~/mixin/flowStore'
import FlowLoader from '~/components/FlowLoader'
import TrendIdolItem from '~/components/TrendIdolItem'
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
      <FlowLoader
        launch
        flow={this.state}
        slug={this.props.slug}
        namespace={this.state.flowNamespace}
        scrollY={this.props.scrollY}
      >
        {
          this.state.flow_result.map(item => (
            <TrendIdolItem
              taroKey={item.slug}
              key={item.slug}
              idol={item}
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
  scrollY: true,
  autoload: false
}

export default UserIdol
