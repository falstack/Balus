import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/components/FlowList/flowEvent'
import flowStore from '~/components/FlowList/flowStore'
import FlowLoader from '~/components/FlowLoader'
import FlowPinItem from '~/components/FlowItem/FlowPinItem'
import './index.scss'

@flowStore
@flowEvent
class NewsPin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowNamespace: 'index',
      flowReq: {
        url: 'bangumi/pins',
        type: 'lastId',
        query: {
          slug: '54xzu',
          sort: 'newest',
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
        namespace={this.state.flowNamespace}
      >
        {
          this.state.flow_result.map(item => (
            <FlowPinItem
              taroKey={item.slug}
              key={item.slug}
              item={item}
              params={{ showBangumi: false, showTime: true }}
            />
          ))
        }
      </FlowLoader>
    )
  }
}

NewsPin.defaultProps = {
  slug: 'news',
  autoload: false
}

export default NewsPin
