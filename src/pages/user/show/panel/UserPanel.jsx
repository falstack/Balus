import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Navigator } from '@tarojs/components'
import { inject, observer } from '@tarojs/mobx'
import utils from '~/utils'
import http from '~/utils/http'
import toast from '~/utils/toast'
import './index.scss'

@inject('user')
@observer
export default class UserPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  getMessageChannel() {
    http.get('message/get_channel', {
      type: 1,
      slug: this.props.info.slug
    })
      .then(channel => {
        this.$preload('room', this.props.info)
        Taro.navigateTo({
          url: `/pages/message/chat/index?channel=${channel}`,
        })
      })
      .catch(() => {
        toast.info('暂时不能私信TA')
      })
  }

  render() {
    const { info } = this.props
    if (!info) {
      return
    }
    const isMine = info.slug === this.props.user.info.slug
    const badges = info.title.map(badge => {
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
            src={utils.resize(info.avatar, {
              height: 160,
              mode: 2
            })}
            mode='aspectFill'
            className='avatar'
          />
          {
            isMine
              ? <Navigator hover-class='none' url={`/pages/webview/index?url=${encodeURIComponent('user/edit?slug=' + info.slug)}`} className='edit-profile-btn'>编辑资料</Navigator>
              : <View className='edit-profile-btn' onClick={this.getMessageChannel}>私信</View>
          }
        </View>
        <View className='nickname-wrap'>
          <Text className='nickname'>{info.nickname}</Text>
          <Text className='level'>LV{info.level}</Text>
        </View>
        <View className='intro-wrap'>
          <View className='badges'>{badges}</View>
          <View className='intro'>{info.signature}</View>
        </View>
        <View className='meta-wrap'>
          <View className='meta'>
            <View className='count'>{info.wallet_coin}</View>
            <View className='name'>团子</View>
          </View>
          <View className='meta'>
            <View className='count'>{info.wallet_money}</View>
            <View className='name'>光玉</View>
          </View>
        </View>
      </View>
    )
  }
}

UserPanel.defaultProps = {
  info: {
    title: []
  }
}
