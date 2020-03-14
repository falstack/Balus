import Taro, { Component } from '@tarojs/taro'
import { View, Image, ScrollView } from '@tarojs/components'
import Loading from '~/image/loading.gif'
import Nothing from '~/image/page_nothing.png'
import Error from '~/image/page_error.png'
import event from '~/utils/event'
import { defaultFlowField, flowEventKey } from '~/utils/flow'
import './index.scss'

export default class FlowLoader extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  shouldComponentUpdate (nextProps) {
    if (this.props.scrollX !== nextProps.scrollX) {
      return true
    }
    if (this.props.scrollY !== nextProps.scrollY) {
      return true
    }
    if (
      this.props.flow.flow_nothing !== nextProps.flow.flow_nothing ||
      this.props.flow.flow_loading !== nextProps.flow.flow_loading ||
      this.props.flow.flow_fetched !== nextProps.flow.flow_fetched ||
      this.props.flow.flow_noMore !== nextProps.flow.flow_noMore ||
      this.props.flow.flow_error !== nextProps.flow.flow_error ||
      this.props.flow.flow_result.length !== nextProps.flow.flow_result.length
    ) {
      return true
    }
    return false
  }

  handleBottom() {
    if (this.props.flow.flow_noMore) {
      return
    }
    event.emit(flowEventKey(this.props.namespace, 'bottom', this.props.slug))
  }

  handleRefresh() {
    event.emit(flowEventKey(this.props.namespace, 'refresh', this.props.slug))
  }

  render () {
    const { flow, launch } = this.props
    if (flow.flow_nothing) {
      return (
        <View className='flow-state'>
          {
            launch ? <Image className='state-image nothing' src={Nothing} /> : ''
          }
          <View className='state-tip'>这里什么都没有</View>
        </View>
      )
    }
    if (flow.flow_loading && launch && !flow.flow_fetched) {
      return (
        <View className='flow-state'>
          <Image className='state-image loading' src={Loading} />
        </View>
      )
    }
    if (flow.flow_error && launch && !flow.flow_total) {
      return (
        <View className='flow-state'>
          <Image className='state-image error' src={Error} />
          <View className='state-tip'>{ flow.flow_error.message || '网络错误' }</View>
        </View>
      )
    }
    return (
      <ScrollView
        scrollAnchoring
        refresherTriggered={flow.flow_refreshing}
        scrollY={this.props.scrollY}
        scrollX={this.props.scrollX}
        refresherEnabled={this.props.refresh}
        onScrollToLower={this.handleBottom}
        onRefresherRefresh={this.handleRefresh}
        className='flow-loader'
      >
        {this.props.children}
      </ScrollView>
    )
  }
}

FlowLoader.defaultProps = {
  flow: { ...defaultFlowField },
  launch: true,
  refresh: false,
  scrollX: false,
  scrollY: true,
  namespace: 'flow',
  slug: 0
}
