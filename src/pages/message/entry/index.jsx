import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import menuRect from '~/mixin/menuRect'
import NoticeMenu from '~/components/FlowList/NoticeMenu'
import MessageMenu from '~/components/FlowList/MessageMenu'
import TabHeader from '~/components/TabHeader'
import CustomBar from '~/components/CustomBar'
import event from '~/utils/event'
import { flowEventKey } from '~/utils/flow'
import './index.scss'

@menuRect
class MessageEntry extends Component {
  config = {
    navigationStyle: 'custom',
    disableScroll: true
  }

  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      current: 0,
      tabs: [
        { title: '通知', type: 'notice' },
        { title: '私信', type: 'email' },
      ]
    }
  }

  handleTabClick(value) {
    const current = typeof value === 'number' ? value : value.detail.current
    if (current === this.state.current) {
      return
    }
    this.setState({ current })
    const tab = this.state.tabs[current]
    event.emit(flowEventKey(`${tab.type}-message`, 'switch', ''))
  }

  render () {
    const { current, tabs, menuRect } = this.state
    if (!menuRect) {
      return
    }

    return (
      <View className='message-show scroll-page'>
        <View
          className='flex-shrink-0 header-wrap'
          style={`padding-top:${menuRect.top}px;padding-left:${menuRect.right + menuRect.width}px;padding-right:${menuRect.right + menuRect.width}px;height:${menuRect.height + menuRect.right + menuRect.top}px`}
        >
          <TabHeader
            pink
            list={tabs.map(_ => _.title)}
            active={current}
            height={`${menuRect.height + menuRect.right}px`}
            onClick={this.handleTabClick.bind(this)}
          />
        </View>
        <View className='flex-grow-1'>
          <Swiper
            className='scroll-wrap'
            current={current}
            autoplay={false}
            duration={300}
            onChange={this.handleTabClick}
          >
            <SwiperItem>
              <NoticeMenu />
            </SwiperItem>
            <SwiperItem>
              <MessageMenu />
            </SwiperItem>
          </Swiper>
        </View>
        <View className='flex-shrink-0'>
          <CustomBar active={2} />
        </View>
      </View>
    )
  }
}

export default MessageEntry
