import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button, Input } from '@tarojs/components'
import { oAuthLogin, accessLogin } from '~/utils/login'
import toast from '~/utils/toast'
import utils from '~/utils'
import classNames from 'classnames'
import loginBg from '~/image/login_bg.png'
import wechatIcon from '~/image/login_wechat_icon.png'
import qqIcon from '~/image/login_qq_icon.png'
import './index.scss'

/*
<View className='input-wrap'>
  <Input
    type='password'
    placeholder='密码不能少于6位数'
    clear
    value={this.state.secret}
    onChange={(evt) => { this.setState({ secret: evt.detail.value }) }}
  />
</View>
*/

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
      step: 0,
      accessValidate: false,
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

  onSubmit() {
    const { access, secret } = this.state
    if (
      !access ||
      !access.length === 11
    ) {
      this.setState({
        loading: false
      })
      return toast.info('请输入正确的手机号')
    }
    if (this.state.loading || this.state.submitting) {
      return
    }
    this.setState({
      loading: true
    })
    if (!secret || secret.length < 6 || secret.length > 16) {
      this.setState({
        loading: false
      })
      return toast.info('密码错误')
    }
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

  handleAccess(evt) {
    const { value } = evt.detail
    this.setState({
      access: value,
      accessValidate: value.length === 11
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

  render() {
    const { step } = this.state

    return (
      <View className='user-sign'>
        <View className='form-wrap'>
          <View className='bg'>
            <Image src={loginBg} mode='aspectFit' />
          </View>
          <View className='sign-form'>
            <View className='title'>{step === 0 ? '手机号登录注册' : '账号登录'}</View>
            <View className='input-wrap'>
              <Text>+86</Text>
              <Input
                type='number'
                placeholder='输入手机号'
                value={this.state.access}
                onInput={this.handleAccess}
              />
            </View>
            {
              step === 1 ? (
                <View className='input-wrap'>
                  <Text className='iconfont ic-secret' />
                  <Input
                    type='password'
                    placeholder='请输入密码'
                    password
                    value={this.state.secret}
                    onInput={(evt) => { this.setState({ secret: evt.detail.value }) }}
                  />
                </View>
              ) : ''
            }
            <Button
              className={classNames('submit-btn', { 'is-active': this.state.accessValidate })}
              loading={this.state.loading}
              onClick={this.onSubmit}
            >
              {step === 0 ? '登录/注册' : '登录'}
            </Button>
            <View className='method' onClick={this.changeMethod}>
              {step === 0 ? '账号密码登录' : '短信验证码登录'}
            </View>
          </View>
        </View>
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
      </View>
    )
  }
}
