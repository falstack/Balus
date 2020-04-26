import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import cache from '~/utils/cache'
import event from '~/utils/event'
import utils from '~/utils'
import menuRect from '~/mixin/menuRect'
import './index.scss'

@menuRect
class IndexHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...(this.state || {}),
      user: null
    }
  }

  static options = {
    addGlobalClass: true
  }

  componentWillMount() {
    this.setState({
      user: cache.get('USER', null)
    })
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
    const { user, menuRect } = this.state
    if (!menuRect) {
      return
    }
    return (
      <View
        className='index-header'
        style={`margin-top: ${menuRect.top}px;padding-left:${menuRect.right * 2}px;padding-right:${menuRect.right * 3 + menuRect.width}px;height:${menuRect.height + menuRect.right}px`}
      >
        <View className='shim' style={`height: ${menuRect.top}px`} />
        <View className='avatar' style={`width: ${menuRect.height}px;height:${menuRect.height}px;margin-right:${menuRect.right * 2}px`}>
          <Image onClick={this.handleAvatarClick} src={utils.resize(user ? user.avatar : 'default-poster', { width: menuRect.height })} />
        </View>
        <View onClick={this.handleSearchClick} className='search' style={`border-radius:${menuRect.height / 2}px;height:${menuRect.height}px`}>
          <Text className='iconfont ic-search' />
          <Text className='text'>搜索 calibur.tv</Text>
        </View>
      </View>
    )
  }
}

export default IndexHeader
