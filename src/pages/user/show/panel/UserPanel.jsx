import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtTag } from 'taro-ui'
import PageNav from '~/components/PageNav/index'
import helper from '~/utils/helper'
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
    const badges = user.title.map(badge => {
      const key = Math.random()
        .toString(36)
        .slice(2, -1)
      return (
        <AtTag key={key} taroKey={key} size='small' circle>
          {badge}
        </AtTag>
      )
    })
    return (
      <View class='public-user-panel'>
        <View className='background'>
          <View className='shim' />
          <Image
            src={helper.resize(user.banner, {
              height: 300,
              mode: 2
            })}
            mode='aspectFill'
          />
          <PageNav />
        </View>
        <View className='profile'>
          <View className='user'>
            <Image
              src={helper.resize(user.avatar, {
                height: 160,
                mode: 2
              })}
              mode='aspectFill'
              className='avatar'
            />
            <View className='nickname-wrap'>
              <Text className='nickname'>{user.nickname}</Text>
              <Text className='level'>LV{user.level2}</Text>
            </View>
          </View>
          <View className='badges'>{badges}</View>
          <View className='intro'>{user.signature}</View>
          <View className='metas'>
            <View className='meta'>
              <View className='count'>{Number(user.stat_activity) + Number(user.stat_exposure)}</View>
              <View className='name'>战斗力</View>
            </View>
            <View className='meta'>
              <View className='count'>{user.followers_count}</View>
              <View className='name'>粉丝</View>
            </View>
            <View className='meta'>
              <View className='count'>{user.following_count}</View>
              <View className='name'>关注</View>
            </View>
          </View>
        </View>
        <View className='hr' />
      </View>
    )
  }
}

UserPanel.defaultProps = {
  user: {
    title: []
  }
}
