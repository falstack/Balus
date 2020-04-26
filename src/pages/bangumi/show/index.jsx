import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import TabHeader from '~/components/TabHeader'
import BlurHeader from '~/components/BlurHeader/index'
import BangumiHeader from './header/index'
import PinList from '~/components/FlowList/PinList/index'
import IdolList from '~/components/FlowList/IdolList/index'
import http from '~/utils/http'
import event from '~/utils/event'
import blurPage from '~/mixin/blurPage'
import menuRect from '~/mixin/menuRect'
import pageShare from '~/mixin/pageShare'
import { flowEventKey } from '~/utils/flow'
import './index.scss'

@blurPage
@menuRect
@pageShare
class BangumiShow extends Component {
  config = {
    navigationStyle: 'custom',
    disableScroll: false,
    onReachBottomDistance: 0
  }

  constructor (props) {
    super(props)
    this.state = {
      ...(this.state || {}),
      slug: this.$router.params.slug,
      bangumi: null,
      current: 0,
      tabs: []
    }
  }

  componentWillMount() {
    this.getBangumi()
  }

  getBangumi() {
    const { bangumi } = (this.$router.preload || {})
    const handler = bangumi => {
      const tabs = bangumi.type.toString() === '0' ? [
        { type: 'pin', title: '帖子', sort: 'activity' },
        { type: 'idol', title: '角色', sort: 'hottest' }
      ] : [
        { type: 'pin', title: '动态', sort: 'activity' },
        { type: 'pin', title: '最新', sort: 'newest' },
      ]
      this.setState({
        tabs,
        bangumi,
        shareData: {
          title: bangumi.name,
          path: `/pages/bangumi/show/index?slug=${bangumi.slug}`,
          imageUrl: `${bangumi.avatar}?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/400`
        }
      })
      this.patchBangumiData(bangumi)
    }

    if (bangumi) {
      handler(bangumi)
      return
    }

    http.get('bangumi/show', { slug: this.state.slug })
      .then(handler)
      .catch(() => {})
  }

  patchBangumiData(bangumi) {
    http.get('bangumi/patch', {
      slug: this.state.slug
    })
      .then(data => {
        this.setState({
          bangumi: {
            ...bangumi,
            ...data
          }
        })
      })
      .catch(() => {})
  }

  handleTabClick(value) {
    const current = typeof value === 'number' ? value : value.detail.current
    if (current === this.state.current) {
      return
    }
    this.setState({ current })
    const tab = this.state.tabs[current]
    event.emit(flowEventKey(`${tab.type}-bangumi-${tab.sort}`, 'switch', this.state.slug))
  }

  handleUpdate(data) {
    const bangumi = this.state.bangumi
    this.setState({
      bangumi: {
        ...bangumi,
        ...data
      }
    })
  }

  getFlowComponent(tab) {
    const { slug, scrollActive } = this.state
    switch (tab.type) {
      case 'pin': {
        return <PinList
          scrollY={scrollActive}
          sort={tab.sort}
          from='bangumi'
          slug={slug}
          params={{ showBangumi: false }}
          autoload
        />
      }
      case 'idol': {
        return <IdolList
          scrollY={scrollActive}
          sort={tab.sort}
          from='bangumi'
          slug={slug}
          params={{ showBangumi: false }}
        />
      }
    }
  }

  render () {
    const { current, tabs, slug, bangumi, collapsedHeader, menuRect } = this.state
    if (!bangumi || !menuRect) {
      return
    }
    return (
      <View>
        <BlurHeader blur background={bangumi.avatar} title={bangumi.name} collapsed={collapsedHeader}>
          <BangumiHeader slug={slug} bangumi={bangumi} onUpdate={this.handleUpdate.bind(this)} />
        </BlurHeader>
        <TabHeader
          line
          list={tabs.map(_ => _.title)}
          active={current}
          onClick={this.handleTabClick.bind(this)}
        />
        <View style={`position:relative;height:calc(100vh - ${menuRect.header + 40}px)`}>
          <Swiper
            className='scroll-wrap'
            current={current}
            autoplay={false}
            duration={300}
            onChange={this.handleTabClick}
          >
            {tabs.map(tab => (
              <SwiperItem key={tab.type}>
                {this.getFlowComponent(tab)}
              </SwiperItem>
            ))}
          </Swiper>
        </View>
      </View>
    )
  }
}

export default BangumiShow
