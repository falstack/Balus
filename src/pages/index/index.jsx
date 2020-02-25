import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import SearchHeader from '~/components/SearchHeader/index'
import NewsPin from '~/components/FlowList/NewsPin/index'
import RecommendedPin from '~/components/FlowList/RecommendedPin/index'
import ActivityIdol from '~/components/FlowList/ActivityIdol/index'
import BangumiActive from '~/components/FlowList/BangumiActive/index'
import WriteFlatBtn from '~/components/WriteFlatBtn/index'
import TabHeader from '~/components/TabHeader'
import event from '~/utils/event'
import { flowEventKey } from '~/utils/flow'
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
    event.emit(flowEventKey('index', 'switch', this.state.tabs[current].slug))
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
    return <BangumiActive slug={slug} />
  }

  render () {
    const { current, tabs } = this.state
    return (
      <View className='homepage scroll-page'>
        <View className='flex-shrink-0'>
          <SearchHeader />
        </View>
        <View className='flex-shrink-0'>
          <TabHeader
            line
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
            skipHiddenItemLayout
            onChange={this.handleTabClick.bind(this)}
          >
            {tabs.map(tab => (
              <SwiperItem
                key={tab.slug}
                taroKey={tab.slug}
              >
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
