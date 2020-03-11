import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/mixin/flowEvent'
import flowStore from '~/mixin/flowStore'
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
        refresh
        flow={this.state}
        slug={this.props.slug}
        namespace={this.state.flowNamespace}
      >
        {
          this.state.flow_result.map(item => (
            <FlowPinItem
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
  refresh: true,
  autoload: false
}

export default NewsPin
