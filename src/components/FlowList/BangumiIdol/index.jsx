import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/mixin/flowEvent'
import flowStore from '~/mixin/flowStore'
import FlowLoader from '~/components/FlowLoader'
import TrendIdolItem from '~/components/FlowItem/TrendIdolItem'
import './index.scss'

@flowStore
@flowEvent
class BangumiIdol extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowNamespace: 'bangumi',
      flowReq: {
        url: 'bangumi/idols',
        type: 'page',
        query: {
          slug: this.props.bangumiSlug
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
              idol={item}
              index={index}
            />
          ))
        }
      </FlowLoader>
    )
  }
}

BangumiIdol.defaultProps = {
  slug: '',
  bangumiSlug: '',
  autoload: false
}

export default BangumiIdol
