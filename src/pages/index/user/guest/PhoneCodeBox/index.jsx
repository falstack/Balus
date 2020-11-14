import Taro, { Component } from '@tarojs/taro'
import { inject, observer } from '@tarojs/mobx'
import { View, Block, Input, Button } from '@tarojs/components'
import Dialog from '~/components/Dialog'
import toast from '~/utils/toast'
import { env } from '~/utils/env'
import { sendPhoneMessage, bindUser, bindPhone, getWechatPhone, accessLogin } from '~/utils/login'
import CodeInput from '../CodeInput'
import './index.scss'

@inject('user')
@observer
export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '',
      messageCode: '',
      sendMessageTimeout: 0,
      showMessageBox: false,
      showBindOAuth: false,
      submitting: false
    }
  }

  static options = {
    addGlobalClass: true
  }

  getUserPhoneCallback = () => {
    const user = this.props.user.info
    user.providers.bind_phone = true
    this.props.user.updateUserInfo(user)
  }

  handleSubmit = () => {
    if (this.state.submitting) {
      return
    }
    this.setState({
      submitting: true
    })
    if (this.props.type === 'bind_phone') {
      bindPhone({
        phone: this.state.phoneNumber,
        authCode: this.state.messageCode
      })
        .then(() => {
          this.getUserPhoneCallback()
          this.setState({
            submitting: false
          })
        })
        .catch((err) => {
          toast.info(err.message)
        })
    } else {
      accessLogin({
        access: this.state.phoneNumber,
        authCode: this.state.messageCode,
        isRegister: true
      })
        .then(user => {
          this.props.user.updateUserInfo(user)
          this.setState({
            showBindOAuth: this.props.user.isGuest,
            submitting: false
          })
        })
        .catch((err) => {
          toast.info(err.message)
          this.setState({
            messageCode: '',
            submitting: false
          })
        })
    }
  }

  updateMessageCode = (messageCode) => {
    if (messageCode.length === 6) {
      this.setState({
        messageCode
      }, () => {
        this.handleSubmit()
      })
    } else {
      this.setState({ messageCode })
    }
  }

  updatePhoneNumber = (evt) => {
    this.setState({ phoneNumber: evt.detail.value })
  }

  overLoopTimeout = () => {
    const timer = setInterval(() => {
      const { sendMessageTimeout } = this.state
      if (sendMessageTimeout === 1) {
        this.setState({
          sendMessageTimeout: 0
        })
        clearInterval(timer)
      }

      this.setState({
        sendMessageTimeout: sendMessageTimeout - 1
      })
    }, 1000)
  }

  getUserPhone = (evt) => {
    if (!evt.detail.iv) {
      toast.info('请先授权')
      return
    }
    getWechatPhone({
      code: this.props.user.authCode,
      encrypted_data: evt.detail.encryptedData,
      iv: evt.detail.iv,
      type: this.props.type
    })
      .then((data) => {
        if (this.props.type === 'bind_phone') {
          this.getUserPhoneCallback()
        } else {
          this.setState({
            phoneNumber: data.phone_number,
            messageCode: data.message_code
          }, () => {
            this.handleSubmit()
          })
        }
      })
      .catch((err) => {
        toast.info(err.message)
      })
  }

  sendMessage = () => {
    if (this.state.sendMessageTimeout) {
      return
    }

    if (
      !this.state.phoneNumber ||
      this.state.phoneNumber.length !== 11 ||
      !/^\d+$/.test(this.state.phoneNumber)
    ) {
      toast.info('请输入正确的手机号~')
      return
    }

    this.setState({
      sendMessageTimeout: 60
    }, () => {
      this.overLoopTimeout()
    })

    sendPhoneMessage(this.state.phoneNumber, this.props.type)
      .then(() => {
        this.setState({
          showMessageBox: true
        })
      })
      .catch(err => {
        toast.info(err.message)
      })
  }

  bindUserAction = (evt) => {
    if (!evt.detail.userInfo) {
      toast.info('授权后才能登录')
      return
    }
    bindUser({
      iv: evt.detail.iv,
      signature: evt.detail.signature,
      encrypted_data: evt.detail.encryptedData,
      user_info: evt.detail.userInfo
    })
      .then(() => {
        const user = this.props.user.info
        user.providers[`bind_${process.env.TARO_ENV}`] = true
        store.commit('UPDATE_USER_INFO', user)
      })
      .catch((err) => {
        toast.info(err.message)
      })
  }

  render() {
    return (
      <View className='phone-code-box'>
        {
          this.state.showMessageBox ? <View className="message-wrap">
            <CodeInput onInput={this.updateMessageCode} />
          </View> : <View className="input-wrap">
            <View className="area">
              + 86
            </View>
            <Input
              value={this.state.phoneNumber}
              className="input"
              type="number"
              confirm-type="send"
              adjustPosition=""
              placeholder="请输入您的手机号"
              onInput={this.updatePhoneNumber}
            />
          </View>
        }
        <View class="buttons">
          {
            env === 'weapp' && <Block>
              <Button
                className="btn primary-btn-plain"
                open-type="getPhoneNumber"
                hover-class="none"
                onGetPhoneNumber={this.getUserPhone}
              >
                一键授权手机号
              </Button>
              <View className="divider"/>
            </Block>
          }
          <Button
            className="btn primary-btn"
            onClick={this.sendMessage}
          >
            {this.state.sendMessageTimeout ? `${this.state.sendMessageTimeout}s后可重新获取` : '获取短信验证码'}
          </Button>
        </View>
        <Dialog visible={this.state.showBindOAuth} onClose={() => { this.setState({ showBindOAuth: false }) }}>
          <View className="bind-auth-dialog">
            <View className="tip">
              继续操作前请先绑定{env === 'weapp' ? '微信' : 'QQ'}号
            </View>
            <Button
              className="primary-btn"
              open-type="getUserInfo"
              hover-class="none"
              onGetUserInfo={this.bindUserAction}
            >
              一键授权绑定
            </Button>
          </View>
        </Dialog>
      </View>
    )
  }
}
