import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import cache from '~/utils/cache'
import event from '~/utils/event'
import helper from '~/utils/helper'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuRect: helper.getMenuRect(),
      user: cache.get('USER', null)
    }
  }

  componentDidMount() {
    event.on('update-user', () => {
      this.setState({
        user: cache.get('USER', null)
      })
    })
  }

  componentWillUnmount() {
    event.off('update-user')
  }

  handleSearchClick () {
    Taro.navigateTo({
      url: '/pages/search/index',
    })
  }

  handleAvatarClick () {
    const { user } = this.state
    if (user) {
      Taro.navigateTo({
        url: `/pages/user/show/index?slug=${user.slug}`,
      })
    } else {
      Taro.switchTab({
        url: '/pages/user/home/index',
      })
    }
  }

  render () {
    const { menuRect, user } = this.state
    return (
      <View
        className='search-header'
        style={`margin-top: ${menuRect.top}px;padding-left: ${menuRect.right}px;padding-right: ${menuRect.right * 2 + menuRect.width}px;height:${menuRect.height + menuRect.right}px`}
      >
        <View className='shim' style={`height: ${menuRect.top}px`} />
        <View className='avatar' style={`width: ${menuRect.height}px;height:${menuRect.height}px;margin-right:${menuRect.right}px`}>
          <Image onClick={this.handleAvatarClick.bind(this)} src={helper.resize(user ? user.avatar : 'default-poster', { width: menuRect.height * 2 })} />
        </View>
        <View onClick={this.handleSearchClick.bind(this)} className='search' style={`border-radius:${menuRect.height / 2}px;height:${menuRect.height}px`}>
          <AtIcon value='search' color='#999999' size='15' />
          <Text className='text'>搜索 calibur.tv</Text>
        </View>
      </View>
    )
  }
}
