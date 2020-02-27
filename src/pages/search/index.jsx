import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, Input, SwiperItem } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import TabHeader from '~/components/TabHeader'
import SearchBangumi from '~/components/FlowList/SearchBangumi/index'
import SearchIdol from '~/components/FlowList/SearchIdol/index'
import event from '~/utils/event'
import utils from '~/utils'
import classNames from 'classnames'
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
      value: '',
      current: 0,
      showHistory: true,
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

  handleSearchAction(evt) {
    const { value } = evt.detail
    const { tabs, current } = this.state
    this.setState({
      showHistory: !value
    })
    tabs.forEach(tab => {
      event.emit(flowEventKey('search', 'clear', tab.type))
    })
    if (value) {
      event.emit(flowEventKey('search', 'switch', tabs[current].type), {
        q: value
      })
    }
  }

  back() {
    Taro.navigateBack().then(() => {}).catch(() => {
      Taro.switchTab({
        url: '/pages/index/index'
      })
    })
  }

  handleTabClick(value) {
    const current = typeof value === 'number' ? value : value.detail.current
    if (current === this.state.current) {
      return
    }
    this.setState({ current })
    if (!this.state.value) {
      return
    }
    event.emit(flowEventKey('search', 'switch', this.state.tabs[current].type))
  }

  getFlowComponent({ type }) {
    const { value } = this.state
    switch (type) {
      case 'bangumi': {
        return <SearchBangumi slug={type} keyword={value} />
      }
      case 'idol': {
        return <SearchIdol slug={type} keyword={value} />
      }
    }
  }

  render () {
    const { current, tabs, showHistory } = this.state
    const menuRect = utils.getMenuRect()
    return (
      <View className='search scroll-page'>
        <View
          className='flex-shrink-0 input-wrap'
          style={`height:${menuRect.header}px;padding:${menuRect.top}px ${menuRect.width + menuRect.right * 2}px ${menuRect.right}px ${menuRect.right}px`}
        >
          <View class='input-box'>
            <AtIcon value='search' color='#999999' size='15' />
            <Input
              className='input-core'
              value={this.state.value}
              confirmType='search'
              onChange={e => this.setState({ value: e.target.value })}
              onConfirm={this.handleSearchAction.bind(this)}
            />
          </View>
          <Text className='cancel' onClick={this.back}>取消</Text>
        </View>
        {
          showHistory ? <View
            className='history-wrap'
            style={`top:${menuRect.header}px`}
          >
          </View> : ''
        }
        <View className={classNames('flex-shrink-0', { showHistory: 'panel-hidden' })}>
          <TabHeader
            line
            list={tabs.map(_ => _.title)}
            active={current}
            onClick={this.handleTabClick.bind(this)}
          />
        </View>
        <View className={classNames('flex-grow-1', { showHistory: 'panel-hidden' })}>
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
                {this.getFlowComponent(tab)}
              </SwiperItem>
            ))}
          </Swiper>
        </View>
      </View>
    )
  }
}
