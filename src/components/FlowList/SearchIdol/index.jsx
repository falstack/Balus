import Taro, { Component } from '@tarojs/taro'
import flowEvent from '~/mixin/flowEvent'
import flowStore from '~/mixin/flowStore'
import FlowLoader from '~/components/FlowLoader'
import TrendIdolItem from '~/components/FlowItem/TrendIdolItem'
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
            <TrendIdolItem
              taroKey={item.slug}
              key={item.slug}
              idol={item}
            />
          ))
        }
      </FlowLoader>
    )
  }
}

SearchBangumi.defaultProps = {
  slug: 'idol',
  clearable: true,
  autoload: false
}

export default SearchBangumi
