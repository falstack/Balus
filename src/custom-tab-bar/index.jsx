import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Tab0 from '~/image/tab_1.png'
import Tab1 from '~/image/tab_2.png'
import Tab2 from '~/image/tab_3.png'
import Tab3 from '~/image/tab_4.png'
import Tab0Selected from '~/image/tab_1_selected.png'
import Tab1Selected from '~/image/tab_2_selected.png'
import Tab2Selected from '~/image/tab_3_selected.png'
import Tab3Selected from '~/image/tab_4_selected.png'
import cache from '~/utils/cache'
import event from '~/utils/event'
import './index.scss'

class CustomBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: 0,
      tab_2_count: 0
    }
  }

  componentWillMount() {
    event.on('TAB_BAR_2_CHANGE', () => {
      this._updateTabCount(2)
    })
  }

  componentWillUnmount() {
    event.off('TAB_BAR_2_CHANGE')
  }

  componentDidShow() {
    this._updateTabCount(2)
  }

  _updateTabCount(index) {
    const key = `tab_${index}_count`
    this.setState({
      [key]: cache.get(`TAB_BAR_${index}_COUNT`, 0)
    })
  }

  handleClick(index) {
    if (this.state.active === index) {
      return
    }

    this.setState({
      active: index
    })

    event.emit('TAB_SWITCH', index)
  }

  clickCreate() {
    Taro.navigateTo({
      url: `/pages/webview/index?url=${encodeURIComponent('write/pin')}`
    })
  }

  render () {
    const { active } = this.state
    const { tab_2_count } = this.state

    return (
      <View className="tabbar">
        <View className="tabbar__wrap">
          <View className="tabbar__mask" />
          <View className="tabbar__text">
            <View className='tab'>
              <Image src={active === 0 ? Tab0Selected : Tab0} onClick={() => {this.handleClick(0)}} />
              <Text>发现</Text>
            </View>
            <View className='tab'>
              <Image src={active === 1 ? Tab1Selected : Tab1} onClick={() => {this.handleClick(1)}} />
              <Text>番剧</Text>
            </View>
            <View className="tab">
              <View className="create-btn" onClick={this.clickCreate}>
                <View className="right" />
                <View className="left" />
              </View>
            </View>
            <View className='tab'>
              <Image src={active === 2 ? Tab2Selected : Tab2} onClick={() => {this.handleClick(2)}} />
              {
                tab_2_count && <View className='badge'>{tab_2_count}</View>
              }
              <Text>消息</Text>
            </View>
            <View className='tab'>
              <Image src={active === 3 ? Tab3Selected : Tab3} onClick={() => {this.handleClick(3)}} />
              <Text>我的</Text>
            </View>
          </View>
        </View>
        <View className="tabbar__shim" />
      </View>
    )
  }
}

export default CustomBar
