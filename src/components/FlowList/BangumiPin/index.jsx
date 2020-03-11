import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/mixin/flowEvent'
import flowStore from '~/mixin/flowStore'
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
        refresh={this.props.refresh}
        scrollY={this.props.scrollY}
        namespace={this.state.flowNamespace}
      >
        {
          this.state.flow_result.map(item => (
            <FlowPinItem
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
  refresh: true,
  autoload: false,
  scrollY: true
}

export default BangumiActive
