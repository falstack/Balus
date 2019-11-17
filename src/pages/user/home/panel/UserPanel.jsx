import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator } from '@tarojs/components'
import helper from '~/utils/helper'
import { AtAvatar, AtIcon, AtButton } from 'taro-ui'
import http from '~/utils/http'
import state from '~/utils/state'
import './index.scss'

export default class UserPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signing: false
    }
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  daySignAction() {
    if (this.props.user.daySign || this.state.signing) {
      return
    }
    this.setState({
      signing: true
    })
    http
      .post('user/daySign')
      .then(res => {
        this.setState({
          signing: false
        })
        state.updateUserExp(res, {
          daySign: true
        })
        state.updateUserPocket(1)
      })
      .catch(() => {
        this.setState({
          signing: false
        })
      })
  }

  render() {
    const { user } = this.props
    if (!user) {
      return
    }

    return (
      <View className='user-panel'>
        <Navigator hover-class='none' url={`/pages/user/show/index?slug=${user.slug}`}>
          <View className='intro'>
            <View className='avatar'>
              <AtAvatar
                circle
                size='large'
                image={helper.resize(user.avatar, { width: 200 })}
              />
            </View>
            <View className='text'>
              <View className='nickname-wrap'>
                <Text className='nickname'>{user.nickname}</Text>
                <Text className='level'>LV{user.level}</Text>
              </View>
              <Text className='invite'>cc号：{user.slug}</Text>
            </View>
            <View className='arrow'>
              <AtIcon value='chevron-right' size='20' color='#657786' />
            </View>
          </View>
        </Navigator>
        <View className='control'>
          <View className='metas'>
            <View className='meta'>
              <View className='count'>{user.stat_activity + user.stat_exposure}</View>
              <View className='name'>战斗力</View>
            </View>
            <View className='meta'>
              <View className='count'>{user.wallet_coin}</View>
              <View className='name'>团子</View>
            </View>
            <View className='meta'>
              <View className='count'>{user.wallet_money}</View>
              <View className='name'>光玉</View>
            </View>
          </View>
          <View className='day-sign'>
            <AtButton
              loading={this.state.signing}
              circle
              type={user.daySign ? 'secondary' : 'primary'}
              onClick={this.daySignAction}
            >
              {user.daySign ? '已签到' : '签到'}
            </AtButton>
          </View>
        </View>
      </View>
    )
  }
}

UserPanel.defaultProps = {
  user: {
    providers: {}
  }
}
