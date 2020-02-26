import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/mixins/flowEvent'
import flowStore from '~/mixins/flowStore'
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
  autoload: false
}

export default ActivityIdol
