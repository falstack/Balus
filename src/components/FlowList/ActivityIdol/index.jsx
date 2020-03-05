import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/mixin/flowEvent'
import flowStore from '~/mixin/flowStore'
import FlowLoader from '~/components/FlowLoader'
import TrendIdolItem from '~/components/TrendIdolItem'
import './index.scss'

@flowStore
@flowEvent
class ActivityIdol extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowNamespace: 'index',
      flowReq: {
        url: 'idol/list',
        type: 'page',
        query: {
          sort: 'hottest'
        }
      }
    }
  }

  render () {
    return (
      <FlowLoader
        launch
        refresh
        flow={this.state}
        slug={this.props.slug}
        namespace={this.state.flowNamespace}
      >
        {
          this.state.flow_result.map((item, index) => (
            <TrendIdolItem
              taroKey={item.slug}
              key={item.slug}
              index={index}
              idol={item}
            />
          ))
        }
      </FlowLoader>
    )
  }
}

ActivityIdol.defaultProps = {
  slug: 'idol',
  refresh: true,
  autoload: false
}

export default ActivityIdol
