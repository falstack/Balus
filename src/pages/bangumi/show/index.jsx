import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import { AtTabs } from 'taro-ui'
import BangumiPanel from './panel/BangumiPanel'
import BangumiPin from '~/components/FlowList/BangumiPin/index'
import BangumiIdol from '~/components/FlowList/BangumiIdol/index'
import http from '~/utils/http'
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
      slug: this.$router.params.slug,
      bangumi: null,
      current: 0,
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
    const { current, tabs, slug, bangumi } = this.state
    if (!bangumi) {
      return
    }
    return (
      <View className='bangumi-show scroll-page'>
        <View className='flex-shrink-0'>
          <BangumiPanel slug={slug} bangumi={bangumi} />
        </View>
        <View className='flex-shrink-0'>
          <AtTabs
            current={current}
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
                key={tab.type}
                taroKey={tab.type}
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
      </View>
    )
  }
}
