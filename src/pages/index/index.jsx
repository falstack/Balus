import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import IndexHeader from './header/index'
import ActivityIdol from '~/components/FlowList/ActivityIdol/index'
import PinList from '~/components/FlowList/PinList/index'
import WriteFlatBtn from '~/components/WriteFlatBtn/index'
import TabHeader from '~/components/TabHeader'
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
      ...this.state,
      current: 1,
      tabs: [
        { slug: 'hottest', title: '热门' },
        { slug: 'activity', title: '动态' },
        { slug: 'newest', title: '最新' },
        { slug: 'idol', title: '股市' },
      ]
    }
  }

  handleTabClick(value) {
    const current = typeof value === 'number' ? value : value.detail.current
    if (current === this.state.current) {
      return
    }
    this.setState({ current })
    event.emit(flowEventKey(`index-${this.state.tabs[current].slug}`, 'switch', ''))
  }

  getFlowComponent({ title, slug }) {
    switch (title) {
      case '热门': {
        return <PinList from='index' sort={slug} refresh />
      }
      case '动态': {
        return <PinList from='index' sort={slug} refresh autoload />
      }
      case '最新': {
        return <PinList from='index' sort={slug} refresh params={{ showTime: true }} />
      }
    }
    return <ActivityIdol slug={slug} />
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
            line
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
              <SwiperItem key={tab.slug}>
                {this.getFlowComponent(tab)}
              </SwiperItem>
            ))}
          </Swiper>
        </View>
        <WriteFlatBtn />
      </View>
    )
  }
}

export default indexPage
