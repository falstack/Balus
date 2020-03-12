import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import UserPanel from './panel/UserPanel'
import UserPin from '~/components/FlowList/UserPin/index'
import UserBangumi from '~/components/FlowList/UserBangumi/index'
import UserIdol from '~/components/FlowList/UserIdol/index'
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
      ...this.state,
      slug: this.$router.params.slug,
      user: null,
      current: 0,
      tabs: [
        { type: 'pin', title: '帖子' },
        { type: 'bangumi', title: '番剧' },
        { type: 'idol', title: '偶像' }
      ]
    }
  }

  componentDidMount() {
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
    event.emit(flowEventKey('user', 'switch', this.state.tabs[current].type))
  }

  getFlowComponent({ type }) {
    const { slug, scrollActive } = this.state
    switch (type) {
      case 'pin': {
        return <UserPin scrollY={scrollActive} slug={type} userSlug={slug} />
      }
      case 'bangumi': {
        return <UserBangumi scrollY={scrollActive} slug={type} userSlug={slug} />
      }
      case 'idol': {
        return <UserIdol scrollY={scrollActive} slug={type} userSlug={slug} />
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
