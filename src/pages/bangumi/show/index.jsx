import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import Navbar from '~/components/Navbar/bg'
import navbar from '~/mixin/navbar'
import TabHeader from '~/components/Tabbar'
import BangumiHeader from './header'
import PinList from '~/components/ListView/PinList'
import IdolList from '~/components/ListView/IdolList'
import http from '~/utils/http'
import pageShare from '~/mixin/pageShare'
import './index.scss'

@navbar
@pageShare
class BangumiShow extends Component {
  config = {
    navigationStyle: 'custom',
    navigationBarTextStyle: 'white',
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
    const { slug } = this.state
    switch (tab.type) {
      case 'pin': {
        return <PinList
          query={{
            from: 'bangumi',
            slug: slug,
            sort: tab.sort
          }}
          params={{ showBangumi: false }}
        />
      }
      case 'idol': {
        return <IdolList
          query={{
            sort: tab.sort,
            from: 'bangumi',
            slug: slug
          }}
          params={{ showBangumi: false }}
        />
      }
    }
  }

  render () {
    const { current, tabs, slug, bangumi, rect } = this.state
    if (!bangumi) {
      return
    }

    return (
      <View class='bangumi-show'>
        <Navbar blur title={bangumi.name} background={bangumi.avatar}>
          <BangumiHeader slug={slug} bangumi={bangumi} onUpdate={this.handleUpdate.bind(this)} />
        </Navbar>
        <TabHeader
          line
          list={tabs.map(_ => _.title)}
          active={current}
          onClick={this.handleTabClick.bind(this)}
        />
        <View className='collapsed-panel' style={`height:calc(100vh - ${(rect.navbar || 0) + 40}px)`}>
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
