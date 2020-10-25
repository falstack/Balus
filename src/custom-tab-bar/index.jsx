import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Tab1 from '~/image/tab_1.png'
import Tab2 from '~/image/tab_2.png'
import Tab3 from '~/image/tab_3.png'
import Tab4 from '~/image/tab_4.png'
import Tab1Selected from '~/image/tab_1_selected.png'
import Tab2Selected from '~/image/tab_2_selected.png'
import Tab3Selected from '~/image/tab_3_selected.png'
import Tab4Selected from '~/image/tab_4_selected.png'
import cache from '~/utils/cache'
import event from '~/utils/event'
import './index.scss'

class CustomBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
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
    if (this.props.active === index) {
      return
    }

    const urls = [
      '/pages/index/index',
      '/pages/bangumi/rank/index',
      '/pages/message/entry/index',
      '/pages/user/home/index',
    ]

    Taro.switchTab({
      url: urls[index]
    })
  }

  clickCreate() {
    Taro.navigateTo({
      url: `/pages/webview/index?url=${encodeURIComponent('write/pin')}`
    })
  }

  render () {
    const { active } = this.props
    const { tab_2_count } = this.state

    return (
      <View className='custom-bar'>
        <View className='shim' />
        <View className='core'>
          <View className='mask' />
          <View className="wrap">
            <View className='tab'>
              <Image src={active === 0 ? Tab1Selected : Tab1} onClick={() => {this.handleClick(0)}} />
            </View>
            <View className='tab'>
              <Image src={active === 1 ? Tab2Selected : Tab2} onClick={() => {this.handleClick(1)}} />
            </View>
            <View className='tab' onClick={this.clickCreate}>
              <View className='create-btn'>
                <View className='right' />
                <View className='left' />
              </View>
            </View>
            <View className='tab'>
              <Image src={active === 2 ? Tab3Selected : Tab3} onClick={() => {this.handleClick(2)}} />
              {
                tab_2_count ? <View className='badge'>{tab_2_count}</View> : ''
              }
            </View>
            <View className='tab'>
              <Image src={active === 3 ? Tab4Selected : Tab4} onClick={() => {this.handleClick(3)}} />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

CustomBar.defaultProps = {
  active: 0
}

export default CustomBar
