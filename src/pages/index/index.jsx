import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import IndexHeader from './header/index'
import NewsPin from '~/components/FlowList/NewsPin/index'
import RecommendedPin from '~/components/FlowList/RecommendedPin/index'
import ActivityIdol from '~/components/FlowList/ActivityIdol/index'
import BangumiPin from '~/components/FlowList/BangumiPin/index'
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
        { slug: 'news', title: '新闻' },
        { slug: 'recommended', title: '推荐' },
        { slug: 'idol', title: '股市' },
        { slug: '54xcl', title: '日常' }
      ]
    }
  }

  handleTabClick(value) {
    const current = typeof value === 'number' ? value : value.detail.current
    if (current === this.state.current) {
      return
    }
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
    return <BangumiPin prefix='index' bangumiSlug={slug} slug={slug} />
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
