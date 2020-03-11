import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button, Input } from '@tarojs/components'
import { oAuthLogin, accessLogin } from '~/utils/login'
import toast from '~/utils/toast'
import utils from '~/utils'
import loginBg from '~/image/login_bg.png'
import wechatIcon from '~/image/login_wechat_icon.png'
import qqIcon from '~/image/login_qq_icon.png'
import './index.scss'

export default class extends Component {
  config = {
    navigationStyle: 'custom'
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      submitting: false,
      access: '',
      secret: ''
    }
  }

  redirect() {
    const from = this.$router.params.from
    if (from) {
      Taro.redirectTo({
        url: `/pages/webview/index?url=${from}`
      })
      return
    }
    utils.back('/pages/user/home/index')
  }

  callOAuthSign() {
    if (this.state.loading || this.state.submitting) {
      return
    }
    this.setState({
      submitting: true
    })
    toast.loading('登录中')
    const loginProcess = () => {
      oAuthLogin()
        .then(() => {
          this.setState({
            submitting: false
          })
          toast.stop()
          this.redirect()
        })
        .catch(() => {
          this.setState({
            submitting: false
          })
          toast.stop()
        })
    }
    const self = this
    Taro.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          Taro.authorize({
            scope: 'scope.userInfo',
            success () {
              loginProcess()
            },
            fail () {
              self.setState({
                submitting: false
              })
              toast.info('请先授权')
            }
          })
        } else {
          loginProcess()
        }
      }
    })
  }

  onSubmit() {
    if (this.state.loading || this.state.submitting) {
      return
    }
    const { access, secret } = this.state
    if (
      !access ||
      !access.length === 11
    ) {
      return toast.info('请输入正确的手机号')
    }
    if (!secret || secret.length < 6 || secret.length > 16) {
      return toast.info('密码错误')
    }
    this.setState({
      loading: true
    })
    accessLogin({ access, secret })
      .then(() => {
        this.redirect()
      })
      .catch((err) => {
        toast.info(err.message)
        this.setState({
          loading: false
        })
      })
  }

  render() {
    return (
      <View className='user-sign'>
        <View className='form-wrap'>
          <View className='bg'>
            <Image src={loginBg} mode='aspectFit' />
          </View>
          <View className='sign-form'>
            <View className='input-wrap'>
              <Input
                type='phone'
                placeholder='手机号码'
                value={this.state.access}
                onChange={(evt) => { this.setState({ access: evt.detail.value }) }}
              />
            </View>
            <View className='input-wrap'>
              <Input
                type='password'
                placeholder='密码不能少于6位数'
                clear
                value={this.state.secret}
                onChange={(evt) => { this.setState({ secret: evt.detail.value }) }}
              />
            </View>
            <Button
              className='submit-btn'
              loading={this.state.loading}
              onClick={this.onSubmit}
            >
              登录
            </Button>
          </View>
        </View>
        <View className='others'>
          <View className='divider'>
            <Text className='line'/>
            <Text className='text'>其它登录方式</Text>
            <Text className='line'/>
          </View>
          <Button
            open-type='getUserInfo'
            className='wechat-btn'
            onClick={this.callOAuthSign}
          >
            <Image src={process.env.TARO_ENV === 'weapp' ? wechatIcon : qqIcon} mode='scaleToFill' />
          </Button>
        </View>
      </View>
    )
  }
}
