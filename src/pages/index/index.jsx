import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import { AtTabs } from 'taro-ui'
import SearchCustomHeader from '~/components/SearchCustomHeader/index'
import NewsPin from '~/components/FlowList/NewsPin/index'
import RecommendedPin from '~/components/FlowList/RecommendedPin/index'
import ActivityIdol from '~/components/FlowList/ActivityIdol/index'
import BangumiPin from '~/components/FlowList/BangumiPin/index'
import WriteFlatBtn from '~/components/WriteFlatBtn/index'
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
        { slug: 'idol', title: '股市' },
        { slug: '54xcl', title: '日常' }
      ]
    }
  }

  onShareAppMessage() {
    return {
      title: '萌市，二次元股市',
      path: '/pages/index/index',
      imageUrl: 'https://m1.calibur.tv/default-poster?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/400'
    }
  }

  handleTabClick(value) {
    const current = typeof value === 'number' ? value : value.detail.current
    this.setState({ current })
    event.emit(`tab-flow-scroll-switch-${this.state.tabs[current].slug}`)
  }

  handleScrollBottom() {
    event.emit(`tab-flow-scroll-bottom-${this.state.tabs[this.state.current].slug}`)
  }

  getFlowComponent({ title, slug }) {
    switch (title) {
      case '新闻': {
        return <NewsPin slug={slug} />
      }
      case '推荐': {
        return <RecommendedPin slug={slug} />
      }
      case '股市': {
        return <ActivityIdol slug={slug} />
      }
    }
    return <BangumiPin slug={slug} />
  }

  render () {
    const { current, tabs } = this.state
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
            {tabs.map(tab => (
              <SwiperItem
                key={tab.slug}
                taroKey={tab.slug}
              >
                <ScrollView
                  className='scroll-view'
                  scrollY
                  onScrollToLower={this.handleScrollBottom.bind(this)}
                >
                  {this.getFlowComponent(tab)}
                </ScrollView>
              </SwiperItem>
            ))}
          </Swiper>
        </View>
        <WriteFlatBtn />
      </View>
    )
  }
}
