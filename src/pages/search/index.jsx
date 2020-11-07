import Taro, { Component } from '@tarojs/taro'
import { View, Text, Swiper, Input, SwiperItem } from '@tarojs/components'
import TabHeader from '~/components/TabHeader'
import SearchBangumi from '~/components/FlowList/SearchBangumi'
import SearchIdol from '~/components/FlowList/SearchIdol'
import utils from '~/utils'
import classNames from 'classnames'
import './index.scss'

class SearchShow extends Component {
  config = {
    navigationStyle: 'custom',
    disableScroll: true
  }

  static options = {
    addGlobalClass: true
  }

  constructor (props) {
    super(props)
    const value = this.$router.params.q || ''
    this.state = {
      ...(this.state || {}),
      value,
      current: 0,
      showPanel: !value,
      tabs: [
        { type: 'bangumi', title: '番剧' },
        { type: 'idol', title: '偶像' }
      ]
    }
  }

  onShareAppMessage() {
    return {
      title: '咔哩吧 - 你开心就好',
      path: '/pages/index',
      imageUrl: 'https://m1.calibur.tv/default-poster?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/400'
    }
  }

  handleSearchAction(evt) {
    const { value } = evt.detail
    this.setState({
      showPanel: !value
    })
    // TODO：reset listView
    // TODO：search listView
  }

  handleSubmit(e) {
    const value = e.detail.value
    // TODO：reset listView
    this.setState({
      value,
      current: 0,
      showPanel: !value
    }, () => {
      if (!value) {
        return
      }
      this.setState({ value })
    })
  }

  handleTabClick(value) {
    const current = typeof value === 'number' ? value : value.detail.current
    if (current === this.state.current) {
      return
    }
    this.setState({
      current
    })
  }

  getFlowComponent({ type }) {
    const { value } = this.state
    switch (type) {
      case 'bangumi': {
        return <SearchBangumi keyword={value} />
      }
      case 'idol': {
        return <SearchIdol keyword={value} />
      }
    }
  }

  render () {
    const { current, tabs, showPanel, menuRect } = this.state
    if (!menuRect) {
      return
    }
    return (
      <View className='search scroll-page'>
        <View
          className='flex-shrink-0 input-wrap'
          style={`height:${menuRect.header}px;padding:${menuRect.top}px ${menuRect.width + menuRect.right * 2}px ${menuRect.right}px ${menuRect.right}px`}
        >
          <View class='input-box'>
            <Text className='iconfont ic-search' />
            <Input
              className='input-core'
              value={this.state.value}
              confirmType='search'
              focus
              onChange={e => this.setState({ value: e.target.value })}
              onConfirm={this.handleSubmit}
            />
          </View>
          <Text className='cancel' onClick={() => {utils.back()}}>取消</Text>
        </View>
        {
          showPanel && <View
            className='history-wrap'
            style={`top:${menuRect.header}px`}
          />
        }
        <View className={classNames('flex-shrink-0', { showPanel: 'panel-hidden' })}>
          <TabHeader
            pink
            list={tabs.map(_ => _.title)}
            active={current}
            onClick={this.handleTabClick.bind(this)}
          />
        </View>
        <View className={classNames('flex-grow-1', { showPanel: 'panel-hidden' })}>
          <Swiper
            className='scroll-wrap'
            current={current}
            autoplay={false}
            duration={300}
            onChange={this.handleTabClick}
          >
            {tabs.map(tab => (
              <SwiperItem className='scroll-view' key={tab.type}>
                {this.getFlowComponent(tab)}
              </SwiperItem>
            ))}
          </Swiper>
        </View>
      </View>
    )
  }
}

export default SearchShow
