import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/components/FlowList/flowEvent'
import flowStore from '~/components/FlowList/flowStore'
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
      >
        {
          this.state.flow_result.map(item => (
            <BangumiRankItem
              taroKey={item.slug}
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
  autoload: false
}

export default UserBangumi