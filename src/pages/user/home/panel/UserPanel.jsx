import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Navigator } from '@tarojs/components'
import utils from '~/utils'
import { AtIcon, AtButton } from 'taro-ui'
import http from '~/utils/http'
import state from '~/utils/state'
import toast from '~/utils/toast'
import menuRect from '~/mixin/menuRect'
import './index.scss'

@menuRect
class UserPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      signing: false
    }
  }

  daySignAction() {
    if (this.props.user.daily_signed || this.state.signing) {
      return
    }
    this.setState({
      signing: true
    })
    http
      .post('user/daily_sign')
      .then(res => {
        this.setState({
          signing: false
        })
        toast.info(res.message)
        state.updateUserPocket(res.add_coin_count)
      })
      .catch(() => {
        this.setState({
          signing: false
        })
      })
  }

  render() {
    const { menuRect } = this.state
    if (!menuRect) {
      return
    }
    const { user } = this.props
    if (!user) {
      return
    }

    return (
      <View className='user-panel'>
        <View className='shim' style={`padding-top:${menuRect.header}px`}/>
        <Navigator
          hover-class='none'
          url={`/pages/user/show/index?slug=${user.slug}`}
          style={`padding:0 ${menuRect.right * 2}px`}
        >
          <View className='intro' style={`margin-bottom:${menuRect.right * 2}px`}>
            <View className='avatar' style={`margin-right:${menuRect.right * 2}px`}>
              <Image className='avatar-src' src={utils.resize(user.avatar, { width: 120 })}/>
            </View>
            <View className='text'>
              <View className='nickname-wrap'>
                <Text className='nickname'>{user.nickname}</Text>
                <Text className='level'>LV{user.level}</Text>
              </View>
              <Text className='invite'>cc号：{user.slug}</Text>
            </View>
            <View className='arrow'>
              <AtIcon value='chevron-right' size='20' color='#fff' />
            </View>
          </View>
        </Navigator>
        <View
          className='control'
          style={`padding:${menuRect.right * 2}px ${menuRect.right * 2}px ${menuRect.right * 2}px`}
        >
          <View className='metas'>
            <View className='meta'>
              <View className='count'>{user.following_count}</View>
              <View className='name'>关注</View>
            </View>
            <View className='meta'>
              <View className='count'>{user.followers_count}</View>
              <View className='name'>粉丝</View>
            </View>
          </View>
          <View className='day-sign'>
            <AtButton
              loading={this.state.signing}
              circle
              type={user.daily_signed ? 'secondary' : 'primary'}
              onClick={this.daySignAction.bind(this)}
            >
              {user.daily_signed ? '已签到' : '签到'}
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

export default UserPanel
