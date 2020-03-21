import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button, Input } from '@tarojs/components'
import { oAuthLogin, accessLogin } from '~/utils/login'
import CodeInput from '~/components/CodeInput'
import toast from '~/utils/toast'
import http from '~/utils/http'
import utils from '~/utils'
import classNames from 'classnames'
import loginBg from '~/image/login_bg.png'
import wechatIcon from '~/image/login_wechat_icon.png'
import qqIcon from '~/image/login_qq_icon.png'
import './index.scss'

export default class extends Component {
  config = {
    navigationBarTitleText: '',
    disableScroll: true
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      submitting: false,
      /**
       * 0 手机号登录注册，第一步，待账号认证
       * 1 账号密码登录
       * 2 手机号登录注册，是新账号，走注册，等待输入验证码
       * 3 手机号登录注册，是旧账号，输入验证码
       */
      step: 0,
      accessValidate: false,
      secretValidate: false,
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

  callOAuthSign(from) {
    const env = process.env.TARO_ENV
    if (from === 'wx' && env !== 'weapp') {
      toast.info('请从微信访问')
      return
    }
    if (from === 'qq' && env !== 'qq') {
      toast.info('请从QQ访问')
      return
    }
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

  checkAccessIsNew(access) {
    this.setState({
      loading: true
    })
    http.post('door/detect', {
      method: 'phone',
      access
    })
      .then(res => {
        this.sendValidateMsg(access, res.is_new ? 'sign_up' : 'sign_in')
      })
      .catch(() => {
        toast.info('网络错误')
        this.setState({
          loading: false
        })
      })
  }

  sendValidateMsg(access, type) {
    http.post('door/message', {
      type,
      phone_number: access
    })
      .then(res => {
        this.setState({
          step: res.is_new ? 2 : 3,
          loading: false
        })
      })
      .catch((err) => {
        toast.info(err.message)
        this.setState({
          loading: false
        })
      })
  }

  onSubmit() {
    const { access, secret, step } = this.state
    if (!this.state.accessValidate) {
      return toast.info('请输入11位手机号')
    }
    if (this.state.loading || this.state.submitting) {
      return
    }
    if (step === 0) {
      this.checkAccessIsNew(access)
      return
    }
    if (step === 1) {
      if (!this.state.secretValidate) {
        toast.info('请输入有效的密码')
        return
      }
      this.handleLogin({ access, secret, method: 'pwd' })
    }
  }

  handleLogin({ access, secret, method }, isLogin = true) {
    return new Promise((resolve, reject) => {
      accessLogin({ access, secret, method }, isLogin)
        .then(() => {
          this.redirect()
          resolve()
        })
        .catch((err) => {
          toast.info(err.message)
          this.setState({
            loading: false
          })
          reject()
        })
    })
  }

  handleAccess(evt) {
    const { value } = evt.detail
    this.setState({
      access: value,
      accessValidate: value.length === 11
    })
  }

  handleSecret(evt) {
    const { value } = evt.detail
    this.setState({
      secret: value,
      secretValidate: value.length >= 6 && value.length <= 16
    })
  }

  changeMethod() {
    const { step } = this.state
    let next
    if (step === 0) {
      next = 1
    } else if (step === 1) {
      next = 0
    }
    this.setState({
      step: next
    })
  }

  handleAuthCode(value) {
    let form = {
      access: this.state.access,
    }
    let isLogin = true
    if (this.state.step === 2) {
      isLogin = false
      form.authCode = value
    } else {
      form.secret = value
      form.method = 'msg'
    }
    return this.handleLogin(form, isLogin)
  }

  render() {
    const { step, loading } = this.state
    let title = ''
    let btnTxt = ''
    let switchTxt = ''
    if (step === 0) {
      title = '手机号登录注册'
      btnTxt = '登录/注册'
      switchTxt = '账号密码登录'
    } else if (step === 1) {
      title = '账号登录'
      btnTxt = '登录'
      switchTxt = '短信验证码登录'
    } else if (step === 2) {
      title = '输入短信验证码'
      btnTxt = '注册'
    } else if (step === 3) {
      title = '输入短信验证码'
      btnTxt = '登录'
    }
    const isPreStep = step === 0 || step === 1

    return (
      <View className='user-sign'>
        <View className='form-wrap'>
          <View className='bg'>
            <Image src={loginBg} mode='aspectFit' />
          </View>
          <View className='sign-form'>
            <View className='title'>{title}</View>
            {
              isPreStep ? (
                <View className='input-wrap'>
                  <Text>+86</Text>
                  <Input
                    type='number'
                    disabled={loading}
                    placeholder='输入手机号'
                    value={this.state.access}
                    onInput={this.handleAccess}
                  />
                </View>
              ) : <CodeInput onConfirm={this.handleAuthCode.bind(this)} />
            }
            {
              step === 1 ? (
                <View className='input-wrap'>
                  <Text className='iconfont ic-secret' />
                  <Input
                    type='password'
                    placeholder='请输入密码'
                    disabled={loading}
                    password
                    value={this.state.secret}
                    onInput={this.handleSecret}
                  />
                </View>
              ) : ''
            }
            {
              isPreStep ? (
                <Button
                  className={classNames('submit-btn', { 'is-active': this.state.accessValidate })}
                  loading={loading}
                  onClick={this.onSubmit}
                >
                  {btnTxt}
                </Button>
              ) : ''
            }
            {
              isPreStep ? (
                <View className='method' onClick={this.changeMethod}>
                  {switchTxt}
                </View>
              ) : ''
            }
          </View>
        </View>
        {
          isPreStep ? (
            <View className='others'>
              <View className='divider'>
                <Text className='line'/>
                <Text className='text'>快速登录</Text>
                <Text className='line'/>
              </View>
              <View className='auth-channel'>
                <Button
                  open-type='getUserInfo'
                  className='auth-btn'
                  hover-class='none'
                  onClick={() => this.callOAuthSign('qq')}
                >
                  <Image src={qqIcon} mode='scaleToFill' />
                </Button>
                <Button
                  open-type='getUserInfo'
                  className='auth-btn'
                  hover-class='none'
                  onClick={() => this.callOAuthSign('wx')}
                >
                  <Image src={wechatIcon} mode='scaleToFill' />
                </Button>
              </View>
            </View>
          ) : ''
        }
      </View>
    )
  }
}
