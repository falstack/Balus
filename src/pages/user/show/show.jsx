import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import { AtTabs } from 'taro-ui'
import UserPanel from './panel/UserPanel'
import SearchBangumi from '~/components/FlowList/SearchBangumi/index'
import SearchIdol from '~/components/FlowList/SearchIdol/index'
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
    this.setState({ current })
    event.emit(`tab-flow-scroll-switch-${this.state.tabs[current].type}`)
  }

  handleScrollBottom() {
    event.emit(`tab-flow-scroll-bottom-${this.state.tabs[this.state.current].type}`)
  }

  getFlowComponent({ type }) {
    switch (type) {
      case 'pin': {
        return <SearchBangumi slug={type} />
      }
      case 'bangumi': {
        return <SearchBangumi slug={type} />
      }
      case 'idol': {
        return <SearchIdol slug={type} />
      }
    }
  }

  render () {
    const { current, tabs } = this.state
    return (
      <View className='user-show scroll-page'>
        <View className='flex-shrink-0'>
          <UserPanel user={user} />
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
