import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import TabHeader from '~/components/TabHeader'
import BlurHeader from '~/components/BlurHeader/index'
import BangumiHeader from './header/index'
import BangumiPin from '~/components/FlowList/BangumiPin/index'
import BangumiIdol from '~/components/FlowList/BangumiIdol/index'
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
      ...this.state,
      slug: this.$router.params.slug,
      bangumi: null,
      current: 0,
      tabs: [
        { type: 'pin', title: '帖子' },
        { type: 'idol', title: '角色' }
      ]
    }
  }

  componentDidMount() {
    this.getBangumi()
  }

  getBangumi() {
    const { bangumi } = (this.$router.preload || {})
    const handler = bangumi => {
      this.setState({
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
    event.emit(flowEventKey('bangumi', 'switch', this.state.tabs[current].type))
  }

  getFlowComponent({ type }) {
    const { slug, scrollActive } = this.state
    switch (type) {
      case 'pin': {
        return <BangumiPin
          slug={type}
          prefix='bangumi'
          autoload
          refresh={false}
          scrollY={scrollActive}
          bangumiSlug={slug}
        />
      }
      case 'idol': {
        return <BangumiIdol slug={type} scrollY={scrollActive} bangumiSlug={slug} />
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
          <BangumiHeader slug={slug} bangumi={bangumi} />
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
