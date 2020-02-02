import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import FlowPinItem from '~/components/FlowItem/FlowPinItem/index'
import './index.scss'

export default class FlowLoader extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  getFlowComponent(item, name) {
    switch (name) {
      case 'flow-pin': {
        return <FlowPinItem item={item} />
      }
    }
  }

  render () {
    const { flow, launch, name } = this.props
    if (!name) {
      return
    }
    return (
      <View>
        {flow.flow_result.map(item => (<View key={item.slug} taroKey={item.slug}>{this.getFlowComponent(item, name)}</View>))}
      </View>
    )
  }
}

FlowLoader.defaultProps = {
  flow: {
    flow_result: [],
    flow_noMore: false,
    flow_nothing: false,
    flow_loading: false,
    flow_fetched: false,
    flow_error: null,
    flow_extra: null,
    flow_page: 0,
    flow_total: 0
  },
  launch: false,
  name: ''
}
