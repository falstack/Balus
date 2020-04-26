import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/mixin/flowEvent'
import flowStore from '~/mixin/flowStore'
import FlowLoader from '~/components/FlowLoader'
import FlowPinItem from '~/components/FlowItem/PinItem'
import './index.scss'

const getRandId = () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9][Math.random() * 9 | 0]

@flowStore
@flowEvent
class PinList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...(this.state || {}),
      flowNamespace: `pin-${props.from}-${props.sort}`,
      flowReq: {
        url: `flow/pin/${props.sort}`,
        type: props.sort === 'newest' ? 'lastId' : 'seenIds',
        query: {
          rand_id: getRandId(),
          slug: props.slug,
          from: props.from
        }
      }
    }
  }

  handleRefresh(callback) {
    if (this.props.sort !== 'newest') {
      const { flowReq } = this.state
      this.setState({
        flowReq: {
          ...flowReq,
          query: {
            ...flowReq.query,
            rand_id: getRandId()
          }
        }
      }, () => {
        callback()
      })
    } else {
      callback()
    }
  }

  render () {
    return (
      <FlowLoader
        launch
        flow={this.state}
        slug={this.props.slug}
        refresh={this.props.refresh}
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
  switch: true,
  bottom: true,
  scrollY: true,
  refresh: false,
  autoload: false
}

export default PinList
