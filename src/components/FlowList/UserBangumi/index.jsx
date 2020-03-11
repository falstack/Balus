import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/mixin/flowEvent'
import flowStore from '~/mixin/flowStore'
import FlowLoader from '~/components/FlowLoader'
import BangumiRankItem from '~/components/BangumiRankItem'
import './index.scss'

@flowStore
@flowEvent
class UserBangumi extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowNamespace: 'user',
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
      <FlowLoader
        launch
        flow={this.state}
        slug={this.props.slug}
        namespace={this.state.flowNamespace}
        scrollY={this.props.scrollY}
      >
        {
          this.state.flow_result.map(item => (
            <BangumiRankItem
              key={item.slug}
              bangumi={item}
            />
          ))
        }
      </FlowLoader>
    )
  }
}

UserBangumi.defaultProps = {
  slug: '',
  userSlug: '',
  scrollY: true,
  autoload: false
}

export default UserBangumi
