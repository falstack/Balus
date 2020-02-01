import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import { AtTabs } from 'taro-ui'
import SearchCustomHeader from '~/components/SearchCustomHeader/index'
import NewsPin from '~/components/FlowList/NewsPin/index'
import RecommendedPin from '~/components/FlowList/RecommendedPin/index'
import ActivityIdol from '~/components/FlowList/ActivityIdol/index'
import event from '~/utils/event'
import './index.scss'

export default class extends Component {
  config = {
    navigationStyle: 'custom',
    disableScroll: true
  }

  constructor (props) {
    super(props)
    this.state = {
      current: 1,
      tabs: [
        { slug: 'news', title: '新闻' },
        { slug: 'recommended', title: '推荐' },
        { slug: 'idol', title: '股市' }
      ]
    }
  }

  handleTabClick(value) {
    const current = typeof value === 'number' ? value : value.detail.current
    this.setState({ current })
    event.emit(`index-flow-scroll-switch-${this.state.tabs[current].slug}`)
  }

  handleScrollBottom() {
    event.emit(`index-flow-scroll-bottom-${this.state.tabs[this.state.current].slug}`)
  }

  render () {
    const { current, tabs } = this.state
    const panels = tabs.map(tab => {
      const { title } = tab
      if (title === '新闻') {
        return (
          <SwiperItem
            key={title}
            taroKey={title}
          >
            <ScrollView
              className='scroll-view'
              scrollY
              onScrollToLower={this.handleScrollBottom.bind(this)}
            >
              <NewsPin />
            </ScrollView>
          </SwiperItem>
        )
      }
      if (title === '推荐') {
        return (
          <SwiperItem
            key={title}
            taroKey={title}
          >
            <ScrollView
              className='scroll-view'
              scrollY
              onScrollToLower={this.handleScrollBottom.bind(this)}
            >
              <RecommendedPin />
            </ScrollView>
          </SwiperItem>
        )
      }
      if (title === '股市') {
        return (
          <SwiperItem
            key={title}
            taroKey={title}
          >
            <ScrollView
              className='scroll-view'
              scrollY
              onScrollToLower={this.handleScrollBottom.bind(this)}
            ><ActivityIdol /></ScrollView>
          </SwiperItem>
        )
      }
    })
    return (
      <View className='homepage scroll-page'>
        <View className='flex-shrink-0'>
          <SearchCustomHeader />
        </View>
        <View className='flex-shrink-0'>
          <AtTabs
            current={current}
            scroll
            animated={false}
            tabList={tabs}
            onClick={this.handleTabClick.bind(this)}
          />
        </View>
        <View className='flex-grow-1'>
          <Swiper
            className='scroll-wrap'
            current={current}
            autoplay={false}
            skipHiddenItemLayout
            onChange={this.handleTabClick.bind(this)}
          >
            {panels}
          </Swiper>
        </View>
      </View>
    )
  }
}
