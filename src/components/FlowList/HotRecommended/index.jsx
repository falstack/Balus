import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/mixin/flowEvent'
import flowStore from '~/mixin/flowStore'
import FlowLoader from '~/components/FlowLoader'
import VideoItem from '~/components/FlowItem/VideoItem'
import './index.scss'

@flowStore
@flowEvent
class RecommendedVideos extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowNamespace: 'recommended',
      flowReq: {
        url: 'getHotRecommendedVideos',
        type: 'page',
        query: {
          count: 10
        }
      }
    }
  }

  render () {
    return (
      <FlowLoader
        flow={this.state}
        launch
        before
        namespace={this.state.flowNamespace}
      >
        {
          this.state.flow_result.map(item => (
            <VideoItem taroKey={item.aid} key={item.aid} item={item} />
          ))
        }
      </FlowLoader>
    )
  }
}

RecommendedVideos.defaultProps = {
  loadBefore: true,
  autoload: true
}

export default RecommendedVideos
