import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/mixin/flowEvent'
import flowStore from '~/mixin/flowStore'
import FlowLoader from '~/components/FlowLoader'
import IdolItem from '~/components/FlowItem/IdolItem'
import './index.scss'

@flowStore
@flowEvent
class IdolList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowNamespace: `idol-${props.from}-${props.sort}`,
      flowReq: {
        url: `flow/idol/${props.sort}`,
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
        flow={this.state}
        slug={this.props.slug}
        refresh={this.props.refresh}
        scrollY={this.props.scrollY}
        namespace={this.state.flowNamespace}
      >
        {
          this.state.flow_result.map(item => (
            <IdolItem
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

IdolList.defaultProps = {
  slug: '',
  from: '',
  sort: '',
  params: {},
  scrollY: true,
  refresh: false,
  autoload: false
}

export default IdolList
