import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import UserPanel from './panel/UserPanel'
import UserPin from '~/components/FlowList/UserPin/index'
import UserBangumi from '~/components/FlowList/UserBangumi/index'
import UserIdol from '~/components/FlowList/UserIdol/index'
import TabHeader from '~/components/TabHeader'
import http from '~/utils/http'
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

  onShareAppMessage() {
    const { user } = this.state
    return {
      title: user.nickname,
      path: `/pages/user/show/index?slug=${user.slug}`,
      imageUrl: `${user.avatar}?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/400`
    }
  }

  componentDidMount() {
    this.getUser()
  }

  getUser() {
    http.get(`user/show?slug=${this.state.slug}`)
      .then(user => {
        this.setState({ user })
      })
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
    const { slug } = this.state
    switch (type) {
      case 'pin': {
        return <UserPin slug={type} userSlug={slug} />
      }
      case 'bangumi': {
        return <UserBangumi slug={type} userSlug={slug} />
      }
      case 'idol': {
        return <UserIdol slug={type} userSlug={slug} />
      }
    }
  }

  render () {
    const { current, tabs, user } = this.state
    if (!user) {
      return
    }
    return (
      <View className='user-show scroll-page'>
        <View className='flex-shrink-0'>
          <UserPanel user={user} />
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
                key={tab.type}
                taroKey={tab.type}
              >
                {this.getFlowComponent(tab)}
              </SwiperItem>
            ))}
          </Swiper>
        </View>
      </View>
    )
  }
}
