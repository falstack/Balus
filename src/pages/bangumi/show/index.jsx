import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import { AtTabs } from 'taro-ui'
import BlurHeader from '~/components/BlurHeader/index'
import BangumiHeader from '~/components/BangumiHeader/index'
import BangumiPin from '~/components/FlowList/BangumiPin/index'
import BangumiIdol from '~/components/FlowList/BangumiIdol/index'
import http from '~/utils/http'
import event from '~/utils/event'
import helper from '~/utils/helper'
import './index.scss'

export default class extends Component {
  config = {
    navigationStyle: 'custom',
    disableScroll: false,
    onReachBottomDistance: 0
  }

  constructor (props) {
    super(props)
    this.state = {
      slug: this.$router.params.slug,
      bangumi: null,
      current: 0,
      isCollapsed: false,
      tabs: [
        { type: 'pin', title: '帖子' },
        { type: 'idol', title: '偶像' }
      ]
    }
  }

  onShareAppMessage() {
    const { bangumi } = this.state
    return {
      title: bangumi.name,
      path: `/pages/bangumi/show/index?slug=${bangumi.slug}`,
      imageUrl: `${bangumi.avatar}?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/400`
    }
  }

  componentDidMount() {
    this.getBangumi()
  }

  onReachBottom() {
    this.setState({
      isCollapsed: true
    })
  }

  onPageScroll(evt) {
    const isCollapsed = evt.scrollTop > 100
    if (isCollapsed || isCollapsed === this.state.isCollapsed) {
      return
    }
    this.setState({
      isCollapsed: false
    })
  }

  getBangumi() {
    http.get('bangumi/show', {
      slug: this.state.slug
    })
      .then(bangumi => {
        this.setState({ bangumi })
        this.patchBangumiData(bangumi)
      })
      .catch(err => {
        console.log(err)
      })
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
    this.setState({ current })
    event.emit(`bangumi-flow-switch-${this.state.tabs[current].type}`)
  }

  handleScrollBottom() {
    event.emit(`bangumi-flow-bottom-${this.state.tabs[this.state.current].type}`)
  }

  getFlowComponent({ type }) {
    const { slug } = this.state
    switch (type) {
      case 'pin': {
        return <BangumiPin slug={type} bangumiSlug={slug} />
      }
      case 'idol': {
        return <BangumiIdol slug={type} bangumiSlug={slug} />
      }
    }
  }

  render () {
    const { current, tabs, slug, bangumi, isCollapsed } = this.state
    if (!bangumi) {
      return
    }
    const menuRect = helper.getMenuRect()
    return (
      <View>
        <BlurHeader background={bangumi.avatar} collapsed={isCollapsed}>
          <BangumiHeader slug={slug} bangumi={bangumi} />
        </BlurHeader>
        <AtTabs
          current={current}
          animated={false}
          tabList={tabs}
          onClick={this.handleTabClick.bind(this)}
        />
        <View style={`position:relative;height:calc(100vh - ${menuRect.header + 40}px)`}>
          <Swiper
            className='scroll-wrap'
            current={current}
            autoplay={false}
            skipHiddenItemLayout
            onChange={this.handleTabClick.bind(this)}
          >
            {tabs.map(tab => (
              <SwiperItem
                key={tab.type}
                taroKey={tab.type}
              >
                <ScrollView
                  className='scroll-view'
                  scrollY={isCollapsed}
                  onScrollToLower={this.handleScrollBottom.bind(this)}
                >
                  {this.getFlowComponent(tab)}
                </ScrollView>
              </SwiperItem>
            ))}
          </Swiper>
        </View>
      </View>
    )
  }
}
