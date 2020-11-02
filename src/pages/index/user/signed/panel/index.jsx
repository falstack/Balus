import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Navigator, Button } from '@tarojs/components'
import { inject, observer } from '@tarojs/mobx'
import Navbar from '~/components/Navbar/text'
import classNames from 'classnames'
import utils from '~/utils'
import http from '~/utils/http'
import toast from '~/utils/toast'
import './index.scss'

@inject('user')
@observer
export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signing: false
    }
  }

  static options = {
    addGlobalClass: true
  }

  daySignAction() {
    if (this.props.user.info.daily_signed || this.state.signing) {
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
        this.props.user.updateUserInfo({
          daily_signed: true
        })
        this.props.user.updateUserPocket(res.add_coin_count)
        toast.info(res.message)
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
      return <View />
    }

    return (
      <View className='user-panel'>
        <Navbar />
        <Navigator
          hover-class='none'
          url={`/pages/user/show/index?slug=${user.info.slug}`}
        >
          <View className='intro'>
            <View className='avatar'>
              <Image className='avatar-src' src={utils.resize(user.info.avatar, { width: 120 })}/>
            </View>
            <View className='text'>
              <View className='nickname-wrap'>
                <Text className='nickname'>{user.info.nickname}</Text>
                <Text className='level'>LV{user.info.level}</Text>
              </View>
              <Text className='invite'>cc号：{user.info.slug}</Text>
            </View>
            <View className='arrow'>
              <Text className='iconfont ic-right' />
            </View>
          </View>
        </Navigator>
        <View className='control'>
          <View className='metas'>
            <Navigator className='meta' hover-class='none' url={`/pages/webview/index?url=${encodeURIComponent('user/list?type=user_following&slug=' + user.info.slug)}`}>
              <View className='count'>{user.info.following_count}</View>
              <View className='name'>关注</View>
            </Navigator>
            <Navigator className='meta' hover-class='none' url={`/pages/webview/index?url=${encodeURIComponent('user/list?type=user_followers&slug=' + user.info.slug)}`}>
              <View className='count'>{user.info.followers_count}</View>
              <View className='name'>粉丝</View>
            </Navigator>
          </View>
          <Button
            className={classNames('sign-btn', { 'is-plant': user.info.daily_signed })}
            loading={this.state.signing}
            onClick={this.daySignAction}
          >
            {user.info.daily_signed ? '已签到' : '签到'}
          </Button>
        </View>
      </View>
    )
  }
}
