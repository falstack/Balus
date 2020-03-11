import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/mixin/flowEvent'
import flowStore from '~/mixin/flowStore'
import FlowLoader from '~/components/FlowLoader'
import BangumiRankItem from '~/components/FlowItem/BangumiRankItem'
import './index.scss'

@flowStore
@flowEvent
class HotBangumi extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowNamespace: 'hot',
      flowReq: {
        url: 'bangumi/hot',
        type: 'page'
      }
    }
  }

  render () {
    return (
      <FlowLoader
        launch
        flow={this.state}
        namespace={this.state.flowNamespace}
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

HotBangumi.defaultProps = {
  autoload: true
}

export default HotBangumi
