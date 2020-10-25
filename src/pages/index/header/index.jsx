import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import cache from '~/utils/cache'
import event from '~/utils/event'
import utils from '~/utils'
import './index.scss'

class IndexHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
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
    const { user } = this.state

    return (
      <View className='index-header'>
        <View className='shim' />
        <View className='avatar' >
          <Image onClick={this.handleAvatarClick} src={utils.resize(user ? user.avatar : 'default-poster')} />
        </View>
        <View onClick={this.handleSearchClick} className='search'>
          <Text className='iconfont ic-search' />
          <Text className='text'>搜索 calibur.tv</Text>
        </View>
      </View>
    )
  }
}

export default IndexHeader
