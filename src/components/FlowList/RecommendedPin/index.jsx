import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/mixins/flowEvent'
import flowStore from '~/mixins/flowStore'
import FlowLoader from '~/components/FlowLoader'
import FlowPinItem from '~/components/FlowItem/FlowPinItem'
import './index.scss'

@flowStore
@flowEvent
class RecommendedPin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowNamespace: 'index',
      flowReq: {
        url: 'bangumi/recommended_pins',
        type: 'seenIds',
        query: {}
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
            />
          ))
        }
      </FlowLoader>
    )
  }
}

RecommendedPin.defaultProps = {
  slug: 'recommended',
  autoload: true
}

export default RecommendedPin
