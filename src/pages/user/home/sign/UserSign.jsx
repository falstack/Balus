import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { AtForm, AtInput, AtButton, AtDivider } from 'taro-ui'
import { wechatLogin, accessLogin } from '~/utils/login'
import toast from '~/utils/toast'
import loginBg from '~/images/login_bg.png'
import wechatIcon from '~/images/login_wechat_icon.png'
import './index.scss'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      submitting: false,
      access: '',
      secret: ''
    }
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  callWechatSign() {
    if (this.state.loading || this.state.submitting) {
      return
    }
    this.setState({
      submitting: true
    })
    toast.loading('登录中')
    wechatLogin()
      .then(() => {
        this.setState({
          submitting: false
        })
        toast.stop()
      })
      .catch(() => {
        this.setState({
          submitting: false
        })
        toast.stop()
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
      !access.length === 11 ||
      !/^(0|86|17951)?(1)[0-9]{10}$/.test(access)
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
      .then(() => {})
      .catch(() => {
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
            onClick={this.callWechatSign.bind(this)}
          >
            <Image src={wechatIcon} mode='scaleToFill' />
          </Button>
        </View>
      </View>
    )
  }
}
