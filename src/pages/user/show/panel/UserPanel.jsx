import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Navigator } from '@tarojs/components'
import utils from '~/utils'
import cache from '~/utils/cache'
import './index.scss'

export default class UserPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { user } = this.props
    if (!user) {
      return
    }
    const isMine = user.slug === cache.get('USER', {}).slug
    const badges = user.title.map(badge => {
      const key = Math.random()
        .toString(36)
        .slice(2, -1)
      return (
        <Text key={key} className='tag'>
          {badge}
        </Text>
      )
    })

    return (
      <View class='public-user-panel'>
        <View className="avatar-wrap">
          <Image
            src={utils.resize(user.avatar, {
              height: 160,
              mode: 2
            })}
            mode='aspectFill'
            className='avatar'
          />
          {
            isMine ? <Navigator hover-class='none' url={`/pages/webview/index?url=${encodeURIComponent('user/edit?slug=' + user.slug)}`} className='edit-profile-btn'>编辑资料</Navigator> : ''
          }
        </View>
        <View className='nickname-wrap'>
          <Text className='nickname'>{user.nickname}</Text>
          <Text className='level'>LV{user.level}</Text>
        </View>
        <View className='intro-wrap'>
          <View className='badges'>{badges}</View>
          <View className='intro'>{user.signature}</View>
        </View>
        <View className='meta-wrap'>
          <View className='meta'>
            <View className='count'>{user.wallet_coin}</View>
            <View className='name'>团子</View>
          </View>
          <View className='meta'>
            <View className='count'>{user.wallet_money}</View>
            <View className='name'>光玉</View>
          </View>
        </View>
      </View>
    )
  }
}

UserPanel.defaultProps = {
  user: {
    title: []
  }
}
