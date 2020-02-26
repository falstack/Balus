import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/mixins/flowEvent'
import flowStore from '~/mixins/flowStore'
import FlowLoader from '~/components/FlowLoader'
import FlowPinItem from '~/components/FlowItem/FlowPinItem'
import './index.scss'

@flowStore
@flowEvent
class BangumiActive extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowNamespace: this.props.prefix,
      flowReq: {
        url: 'bangumi/pins',
        type: 'seenIds',
        query: {
          slug: this.props.bangumiSlug,
          sort: 'active',
          time: 'all',
          is_up: 0
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
        scrollY={this.props.scrollY}
        namespace={this.state.flowNamespace}
      >
        {
          this.state.flow_result.map(item => (
            <FlowPinItem
              taroKey={item.slug}
              key={item.slug}
              item={item}
              params={{ showBangumi: false }}
            />
          ))
        }
      </FlowLoader>
    )
  }
}

BangumiActive.defaultProps = {
  slug: '',
  prefix: '',
  bangumiSlug: '',
  autoload: false,
  scrollY: true
}

export default BangumiActive
