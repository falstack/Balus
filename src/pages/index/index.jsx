import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import IndexHeader from './header/index'
import PinList from '~/components/FlowList/PinList/index'
import IdolList from '~/components/FlowList/IdolList/index'
import TabHeader from '~/components/TabHeader'
import CustomBar from '~/components/CustomBar'
import event from '~/utils/event'
import { flowEventKey } from '~/utils/flow'
import pageShare from '~/mixin/pageShare'
import './index.scss'

@pageShare
class indexPage extends Component {
  config = {
    navigationStyle: 'custom',
    disableScroll: true
  }

  constructor (props) {
    super(props)
    this.state = {
      ...(this.state || {}),
      current: 1,
      tabs: [
        { sort: 'hottest', title: '热门', type: 'pin' },
        { sort: 'activity', title: '动态', type: 'pin' },
        { sort: 'newest', title: '最新', type: 'pin' },
        { sort: 'hottest', title: '股市', type: 'idol' },
      ]
    }
  }

  handleTabClick(value) {
    const current = typeof value === 'number' ? value : value.detail.current
    if (current === this.state.current) {
      return
    }
    this.setState({ current })
    const tab = this.state.tabs[current]
    event.emit(flowEventKey(`${tab.type}-index-${tab.sort}`, 'switch', ''))
  }

  getFlowComponent({ title, sort }) {
    switch (title) {
      case '热门': {
        return <PinList from='index' sort={sort} refresh />
      }
      case '动态': {
        return <PinList from='index' sort={sort} refresh autoload />
      }
      case '最新': {
        return <PinList from='index' sort={sort} refresh params={{ showTime: true }} />
      }
      case '股市': {
        return <IdolList from='index' sort={sort} refresh />
      }
    }
    return <PinList from='index' sort={sort} refresh />
  }

  render () {
    const { current, tabs } = this.state

    return (
      <View className='homepage scroll-page'>
        <View className='flex-shrink-0'>
          <IndexHeader />
        </View>
        <View className='flex-shrink-0'>
          <TabHeader
            pink
            list={tabs.map(_ => _.title)}
            active={current}
            onClick={this.handleTabClick.bind(this)}
          />
        </View>
        <View className='flex-grow-1'>
          <Swiper
            className='scroll-wrap'
            current={current}
            autoplay={false}
            duration={300}
            onChange={this.handleTabClick}
          >
            {tabs.map(tab => (
              <SwiperItem key={tab.sort}>
                {this.getFlowComponent(tab)}
              </SwiperItem>
            ))}
          </Swiper>
        </View>
        <View className='flex-shrink-0'>
          <CustomBar />
        </View>
      </View>
    )
  }
}

export default indexPage
