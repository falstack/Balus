import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import { AtTabs, AtSearchBar } from 'taro-ui'
import SearchBangumi from '~/components/FlowList/SearchBangumi/index'
import SearchIdol from '~/components/FlowList/SearchIdol/index'
import event from '~/utils/event'
import './index.scss'

export default class extends Component {
  config = {
    disableScroll: true
  }

  constructor (props) {
    super(props)
    this.state = {
      value: '',
      lastQuery: '',
      current: 0,
      tabs: [
        { type: 'bangumi', title: '番剧' },
        { type: 'idol', title: '偶像' }
      ]
    }
  }

  onShareAppMessage() {
    return {
      title: '萌市，二次元股市',
      path: '/pages/index/index',
      imageUrl: 'https://m1.calibur.tv/default-poster?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/400'
    }
  }

  handleSearchInput (value) {
    this.setState({
      value
    })
  }

  handleSearchAction() {
    const { value, lastQuery } = this.state
    if (value === lastQuery) {
      return
    }
    this.setState({
      lastQuery: value
    })
    event.emit('search-go', {
      slug: this.state.tabs[this.state.current].type,
      keywords: value
    })
  }

  handleTabClick(value) {
    const current = typeof value === 'number' ? value : value.detail.current
    this.setState({ current })
    const keywords = this.state.lastQuery
    if (!keywords) {
      return
    }
    event.emit(`search-flow-switch-${this.state.tabs[current].type}`)
  }

  handleScrollBottom() {
    const keywords = this.state.lastQuery
    if (!keywords) {
      return
    }
    event.emit(`search-flow-bottom-${this.state.tabs[this.state.current].type}`)
  }

  getFlowComponent({ type }) {
    switch (type) {
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
      <View className='search scroll-page'>
        <View className='flex-shrink-0'>
          <AtSearchBar
            placeholder='搜一下'
            focus
            value={this.state.value}
            onChange={this.handleSearchInput.bind(this)}
            onConfirm={this.handleSearchAction.bind(this)}
            onActionClick={this.handleSearchAction.bind(this)}
          />
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
            duration={300}
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
