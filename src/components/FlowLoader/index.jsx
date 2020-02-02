import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtLoadMore } from 'taro-ui'
import Loading from '~/images/loading.gif'
import Nothing from '~/images/page_nothing.png'
import Error from '~/images/page_error.png'
import FlowPinItem from '~/components/FlowItem/FlowPinItem/index'
import TrendIdolItem from '~/components/TrendIdolItem/index'
import './index.scss'

export default class FlowLoader extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  getFlowComponent(item, name, others, index) {
    switch (name) {
      case 'flow-pin': {
        return <FlowPinItem item={item} others={others} />
      }
      case 'trend-idol': {
        return <TrendIdolItem idol={item} others={others} index={index} />
      }
    }
  }

  render () {
    const { flow, launch, name, others } = this.props
    if (!name) {
      return
    }
    if (flow.flow_nothing) {
      return (
        <View className='flow-loader'>
          {
            launch ? <Image className='state-image nothing' src={Nothing} /> : ''
          }
          <View className='tips'>这里什么都没有</View>
        </View>
      )
    }
    return (
      <View className='flow-loader'>
        {flow.flow_result.map((item, index) => (<View key={item.slug} taroKey={item.slug}>{this.getFlowComponent(item, name, others, index)}</View>))}
        {
          flow.flow_loading ? (
            <View>
              {
                launch && !flow.flow_fetched ? <Image className='state-image loading' src={Loading} /> : <AtLoadMore status='loading' loadingText='' />
              }
            </View>
          ) : ''
        }
        {
          flow.flow_error ? (
            (
              <View>
                {
                  launch && !flow.flow_result.length ? <Image className='state-image error' src={Error} /> : ''
                }
                <View className='tips'>{ flow.flow_error.message || '网络错误' }</View>
              </View>
            )
          ) : ''
        }
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
  launch: true,
  others: {},
  name: ''
}
