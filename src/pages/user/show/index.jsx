import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import UserPanel from './panel/UserPanel'
import PinList from '~/components/FlowList/PinList/index'
import BangumiList from '~/components/FlowList/BangumiList/index'
import IdolList from '~/components/FlowList/IdolList/index'
import TabHeader from '~/components/TabHeader'
import http from '~/utils/http'
import event from '~/utils/event'
import blurPage from '~/mixin/blurPage'
import menuRect from '~/mixin/menuRect'
import pageShare from '~/mixin/pageShare'
import BlurHeader from '~/components/BlurHeader/index'
import { flowEventKey } from '~/utils/flow'
import './index.scss'

@blurPage
@menuRect
@pageShare
class UserShow extends Component {
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
      user: null,
      current: 0,
      tabs: [
        { type: 'pin', title: '帖子', sort: 'newest' },
        { type: 'bangumi', title: '番剧', sort: 'activity' },
        { type: 'idol', title: '偶像', sort: 'hottest' }
      ]
    }
  }

  componentWillMount() {
    this.getUser()
  }

  getUser() {
    const { user } = (this.$router.preload || {})
    const handler = user => {
      this.setState({
        user,
        shareData: {
          path: `/pages/user/show/index?slug=${user.slug}`,
          title: user.nickname,
          imageUrl: `${user.avatar}?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/400`
        }
      })
    }

    if (user) {
      handler(user)
      return
    }

    http.get(`user/show?slug=${this.state.slug}`)
      .then(handler)
      .catch(() => {})
  }

  handleTabClick(value) {
    const current = typeof value === 'number' ? value : value.detail.current
    if (current === this.state.current) {
      return
    }
    this.setState({ current })
    const tab = this.state.tabs[current]
    event.emit(flowEventKey(`${tab.type}-user-${tab.sort}`, 'switch', this.state.slug))
  }

  getFlowComponent(tab) {
    const { slug, scrollActive } = this.state
    switch (tab.type) {
      case 'pin': {
        return <PinList
          scrollY={scrollActive}
          sort={tab.sort}
          from='user'
          slug={slug}
          params={{ showUser: false, showTime: true }}
          autoload
        />
      }
      case 'bangumi': {
        return <BangumiList
          scrollY={scrollActive}
          sort={tab.sort}
          from='user'
          slug={slug}
        />
      }
      case 'idol': {
        return <IdolList
          scrollY={scrollActive}
          sort={tab.sort}
          from='user'
          slug={slug}
          params={{ showUser: false }}
        />
      }
    }
  }

  render () {
    const { current, tabs, user, collapsedHeader, menuRect } = this.state
    if (!user || !menuRect) {
      return
    }

    return (
      <View className='user-show'>
        <BlurHeader background={user.banner} title={user.nickname} collapsed={collapsedHeader}>
          <UserPanel user={user} />
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

export default UserShow
