import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtLoadMore } from 'taro-ui'
import FlowPinItem from '~/components/FlowItem/FlowPinItem/index'
import Loading from '~/images/loading.gif'
import Nothing from '~/images/page_nothing.png'
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
    if (flow.flow_loading) {
      return (
        <View className='flow-loader'>
          {
            launch && !flow.flow_fetched ? <Image className='loading-image' src={Loading} /> : <AtLoadMore status='loading' loadingText='' />
          }
        </View>
      )
    }
    if (flow.flow_nothing) {
      return (
        <View className='flow-loader'>
          {
            launch ? <Image className='error-image' src={Nothing} /> : ''
          }
          <View className='tips'>这里什么都没有</View>
        </View>
      )
    }
    return (
      <View className='flow-loader'>
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
