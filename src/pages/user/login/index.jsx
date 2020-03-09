import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { AtForm, AtInput, AtButton, AtDivider } from 'taro-ui'
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

  changeAccess(value) {
    this.setState({
      access: value
    })
  }

  changeSecret(value) {
    this.setState({
      secret: value
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
        <View class='form-wrap'>
          <View className='bg'>
            <Image src={loginBg} mode='aspectFit' />
          </View>
          <View className='sign-form'>
            <AtForm onSubmit={this.onSubmit.bind(this)}>
              <AtInput
                name='access'
                title='手机'
                type='phone'
                placeholder='手机号码'
                value={this.state.access}
                onChange={this.changeAccess.bind(this)}
              />
              <AtInput
                name='secret'
                title='密码'
                type='password'
                placeholder='密码不能少于6位数'
                clear
                value={this.state.secret}
                onChange={this.changeSecret.bind(this)}
              />
              <View className='btn'>
                <AtButton
                  loading={this.state.loading}
                  circle
                  type='primary'
                  formType='submit'
                  onClick={this.onSubmit.bind(this)}
                >
                  登录
                </AtButton>
              </View>
            </AtForm>
          </View>
        </View>
        <View className='others'>
          <AtDivider
            content='其它登录方式'
            fontColor='#657786'
            lineColor='#ccd6dd'
          />
          <Button
            open-type='getUserInfo'
            className='wechat-btn'
            onClick={this.callOAuthSign.bind(this)}
          >
            <Image src={process.env.TARO_ENV === 'weapp' ? wechatIcon : qqIcon} mode='scaleToFill' />
          </Button>
        </View>
      </View>
    )
  }
}
