import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Navigator, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Navbar from '~/components/Navbar/text'
import classNames from 'classnames'
import utils from '~/utils'
import http from '~/utils/http'
import toast from '~/utils/toast'
import './index.scss'
import { updateUserPocket } from '~/store/actions/user'

@connect(store => ({
  user: store.user.info
}), (dispatch) => ({
  updateUserPocket (val) {
    dispatch(updateUserPocket(val))
  }
}))
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
    this.props.updateUserPocket(1)
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
        this.props.updateUserPocket(res.add_coin_count)
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
          url={`/pages/user/show/index?slug=${user.slug}`}
        >
          <View className='intro'>
            <View className='avatar'>
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
              <Text className='iconfont ic-right' />
            </View>
          </View>
        </Navigator>
        <View className='control'>
          <View className='metas'>
            <Navigator className='meta' hover-class='none' url={`/pages/webview/index?url=${encodeURIComponent('user/list?type=user_following&slug=' + user.slug)}`}>
              <View className='count'>{user.following_count}</View>
              <View className='name'>关注</View>
            </Navigator>
            <Navigator className='meta' hover-class='none' url={`/pages/webview/index?url=${encodeURIComponent('user/list?type=user_followers&slug=' + user.slug)}`}>
              <View className='count'>{user.followers_count}</View>
              <View className='name'>粉丝</View>
            </Navigator>
          </View>
          <Button
            className={classNames('sign-btn', { 'is-plant': user.daily_signed })}
            loading={this.state.signing}
            onClick={this.daySignAction}
          >
            {user.daily_signed ? '已签到' : '签到'}
          </Button>
        </View>
      </View>
    )
  }
}
