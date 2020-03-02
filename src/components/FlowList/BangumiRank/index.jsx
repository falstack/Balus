import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/mixin/flowEvent'
import flowStore from '~/mixin/flowStore'
import FlowLoader from '~/components/FlowLoader'
import BangumiRankItem from '~/components/BangumiRankItem'
import './index.scss'

@flowStore
@flowEvent
class BangumiRank extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowNamespace: 'rank',
      flowReq: {
        url: 'bangumi/rank',
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
          this.state.flow_result.map((item, index) => (
            <BangumiRankItem
              taroKey={item.slug}
              key={item.slug}
              bangumi={item}
              index={index}
            />
          ))
        }
      </FlowLoader>
    )
  }
}

BangumiRank.defaultProps = {
  autoload: true
}

export default BangumiRank
