import Taro, { Component } from '@tarojs/taro'
import { View, Image, ScrollView } from '@tarojs/components'
import Loading from '~/images/loading.gif'
import Nothing from '~/images/page_nothing.png'
import Error from '~/images/page_error.png'
import event from '~/utils/event'
import { defaultFlowField, flowEventKey } from '~/utils/flow'
import './index.scss'

export default class FlowLoader extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  handleTop() {
    if (!this.props.before) {
      return
    }
    event.emit(flowEventKey(this.props.namespace, 'top', this.props.id))
  }

  handleBottom() {
    event.emit(flowEventKey(this.props.namespace, 'bottom', this.props.id))
  }

  render () {
    const { flow, launch } = this.props
    if (flow.flow_nothing) {
      return (
        <View className='flow-state'>
          {
            launch ? <Image className='state-image' src={Nothing} /> : ''
          }
          <View className='state-tip'>这里什么都没有</View>
        </View>
      )
    }
    if (flow.flow_loading && launch && !flow.flow_fetched) {
      return (
        <View className='flow-state'>
          <Image className='state-image' src={Loading} />
        </View>
      )
    }
    if (flow.flow_error && launch && !flow.flow_total) {
      return (
        <View className='flow-state'>
          <Image className='state-image' src={Error} />
          <View className='state-tip'>{ flow.flow_error.message || '网络错误' }</View>
        </View>
      )
    }
    return (
      <ScrollView
        scrollY={this.props.scrollY}
        scrollX={this.props.scrollX}
        scrollAnchoring
        onScrollToUpper={this.handleTop.bind(this)}
        onScrollToLower={this.handleBottom.bind(this)}
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
  before: false,
  scrollX: false,
  scrollY: true,
  namespace: 'flow',
  id: 0
}
