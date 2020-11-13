import Taro, { Component } from '@tarojs/taro'
import { View, Block, Input, Button } from '@tarojs/components'
import Dialog from '~/components/Dialog'
import toast from '~/utils/toast'
import { env } from '~/utils/env'
import CodeInput from '../CodeInput'
import './index.scss'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '',
      messageCode: '',
      sendMessageTimeout: 0,
      showMessageBox: false,
      showBindOAuth: false
    }
  }

  getUserPhoneCallback = () => {
    const user = {...store.state.userInfo}
    user.providers.bind_phone = true
    store.commit('UPDATE_USER_INFO', user)
  }

  handleSubmit = () => {
    if (props.type === 'bind_phone') {
      bindPhone({
        phone: state.phoneNumber,
        authCode: state.messageCode
      })
        .then(getUserPhoneCallback)
        .catch((err) => {
          toast.info(err.message)
        })
    } else {
      accessLogin({
        access: state.phoneNumber,
        authCode: state.messageCode,
        isRegister: true
      })
        .then(user => {
          store.commit('UPDATE_USER_INFO', user)
          state.showBindOAuth = store.getters.isGuest
        })
        .catch((err) => {
          toast.info(err.message)
          state.messageCode = ''
        })
    }
  }

  overLoopTimeout = () => {
    if (state.sendMessageTimeout === 1) {
      state.sendMessageTimeout = 0
      return
    }
    setTimeout(() => {
      state.sendMessageTimeout--
      overLoopTimeout()
    }, 1000)
  }

  getUserPhone = (evt) => {
    if (!evt.detail.iv) {
      toast.info('请先授权')
      return
    }
    getWechatPhone({
      code: store.state.authCode,
      encrypted_data: evt.detail.encryptedData,
      iv: evt.detail.iv,
      type: props.type
    })
      .then((data) => {
        if (props.type === 'bind_phone') {
          getUserPhoneCallback()
        } else {
          state.phoneNumber = data.phone_number
          state.messageCode = data.message_code
          handleSubmit()
        }
      })
      .catch((err) => {
        toast.info(err.message)
      })
  }

  sendMessage = () => {
    if (state.sendMessageTimeout) {
      return
    }

    if (
      !state.phoneNumber ||
      state.phoneNumber.length !== 11 ||
      !/^\d+$/.test(state.phoneNumber)
    ) {
      toast.info('请输入正确的手机号~')
      return
    }

    state.sendMessageTimeout = 60
    overLoopTimeout()

    sendPhoneMessage(state.phoneNumber, props.type)
      .then(() => {
        state.showMessageBox = true
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
        const user = {...store.state.userInfo}
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
            <CodeInput
              v-model="state.messageCode"
              onConfirm={this.handleSubmit}
            />
          </View> : <View className="input-wrap">
            <View className="area">
              + 86
            </View>
            <Input
              v-model="state.phoneNumber"
              className="input"
              type="number"
              auto-focus="true"
              confirm-type="send"
              adjustPosition=""
              placeholder="请输入您的手机号"
            />
          </View>
        }
        <View class="buttons">
          {
            env === 'weapp' && <Block>
              <button
                className="btn primary-btn-plain"
                open-type="getPhoneNumber"
                hover-class="none"
                onGetPhoneNumber={this.getUserPhone}
              >
                一键授权手机号
              </button>
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
        <Dialog v-model="state.showBindOAuth">
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
