import Taro, { Component } from '@tarojs/taro'
import { inject, observer } from '@tarojs/mobx'
import { View, Button } from '@tarojs/components'
import { getAuthCode } from '~/utils/login'
import Drawer from '~/components/Drawer'
import Dialog from '~/components/Dialog'
import toast from '~/utils/toast'
import PhoneCodeBox from './PhoneCodeBox'
import './index.scss'

@inject('user')
@observer
export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDrawer: false,
      showDialog: false,
    }
  }

  static options = {
    addGlobalClass: true
  }

  signInAction = () => {
    getAuthCode()
      .then(code => {
        this.props.user.setAuthCode(code)
        this.setState({
          showDrawer: true
        })
      })
  }

  signUpAction = (evt) => {
    if (!evt.detail.userInfo) {
      toast.info('授权后才能注册')
      return
    }

    this.props.user.userLogin()
      .then(() => {
        getAuthCode()
          .then(code => {
            this.props.user.setAuthCode(code)
            if (this.props.user.isGuest) {
              this.setState({
                showDialog: true
              })
            }
          })
      })
  }

  render() {
    return (
      <View className="guest-panel">
        <View className="login-tips">
          你还没登录呢，喵 o(一︿一+)o
        </View>
        <View className="btn-wrap">
          <Button
            className="primary-btn-plain"
            open-type="getUserInfo"
            hover-class="none"
            onGetUserInfo={this.signUpAction}
          >
            注册
          </Button>
          <Button
            className="primary-btn"
            hover-class="none"
            onClick={this.signInAction}
          >
            登录
          </Button>
        </View>
        <Drawer
          visible={this.state.showDrawer}
          size="100%"
        >
          <View className="login-drawer">
            <View className="title">
              登录
            </View>
            <PhoneCodeBox type="sign_up"/>
          </View>
        </Drawer>
        <Dialog visible={this.state.showDialog}>
          <View className="bind-phone-dialog">
            <View className="tip">
              继续操作前请先绑定手机号
            </View>
            <PhoneCodeBox type="bind_phone"/>
          </View>
        </Dialog>
      </View>
    )
  }
}
