import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/mixin/flowEvent'
import flowStore from '~/mixin/flowStore'
import FlowLoader from '~/components/FlowLoader'
import BangumiItem from '~/components/FlowItem/BangumiItem'
import './index.scss'

@flowStore
@flowEvent
class BangumiList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowNamespace: `bangumi-${props.from}-${props.sort}`,
      flowReq: {
        url: props.from === 'hot' ? 'bangumi/hot' : 'user/like_bangumi',
        type: 'page',
        query: {
          slug: props.slug,
          from: props.from
        }
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
            <BangumiItem
              key={item.slug}
              item={item}
            />
          ))
        }
      </FlowLoader>
    )
  }
}

BangumiList.defaultProps = {
  slug: '',
  from: '',
  sort: '',
  params: {},
  switch: true,
  bottom: true,
  scrollY: true,
  refresh: false,
  autoload: false
}

export default BangumiList
