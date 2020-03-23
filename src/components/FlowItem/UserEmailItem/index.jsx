import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import utils from '~/utils'
import './index.scss'

class UserEmailItem extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  userClick() {
    const user = this.props.item.about_user
    this.$preload('user', user)
    Taro.navigateTo({
      url: `/pages/user/show/index?slug=${user.slug}`,
    })
  }

  render () {
    const { item } = this.props

    return (
      <View className='user-email-item'>
        <Image
          className='avatar'
          src={utils.resize(item.about_user.avatar, { width: 50 })}
          onClick={this.userClick}
        />
        <View className='content'>
          <View className='intro'>
            <View className='nickname'>{item.about_user.nickname}</View>
            <View className='desc'>desc</View>
          </View>
          <View className='meta'>
            <View className='time'>{utils.timeAgo(item.time)}</View>
            {
              item.count ? (
                <View className='count'>{item.count}</View>
              ) : ''
            }
          </View>
        </View>
      </View>
    )
  }
}

UserEmailItem.defaultProps = {
  item: {
    about_user: {}
  }
}

export default UserEmailItem
