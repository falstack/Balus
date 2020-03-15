import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/mixin/flowEvent'
import flowStore from '~/mixin/flowStore'
import FlowLoader from '~/components/FlowLoader'
import BangumiItem from '~/components/FlowItem/BangumiItem'
import './index.scss'

@flowStore
@flowEvent
class SearchBangumi extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowNamespace: 'search',
      flowReq: {
        url: 'search/mixin',
        type: 'page',
        query: {
          type: this.props.slug
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

SearchBangumi.defaultProps = {
  slug: 'bangumi',
  clearable: true,
  autoload: false
}

export default SearchBangumi
