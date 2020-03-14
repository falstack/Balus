import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/mixin/flowEvent'
import flowStore from '~/mixin/flowStore'
import FlowLoader from '~/components/FlowLoader'
import FlowPinItem from '~/components/FlowItem/PinItem'
import './index.scss'

@flowStore
@flowEvent
class PinList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowNamespace: `${props.from}-${props.sort}`,
      flowReq: {
        url: `flow/pin/${props.sort}`,
        type: props.sort === 'newest' ? 'lastId' : 'seenIds',
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
        refresh
        flow={this.state}
        slug={this.props.slug}
        scrollY={this.props.scrollY}
        namespace={this.state.flowNamespace}
      >
        {
          this.state.flow_result.map(item => (
            <FlowPinItem
              key={item.slug}
              item={item}
              params={this.props.params}
            />
          ))
        }
      </FlowLoader>
    )
  }
}

PinList.defaultProps = {
  slug: '',
  from: '',
  sort: '',
  params: {},
  scrollY: true,
  autoload: false
}

export default PinList
