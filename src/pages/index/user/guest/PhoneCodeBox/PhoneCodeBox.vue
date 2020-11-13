<template>
  <view class="phone-code-box">
    <view
      v-if="state.showMessageBox"
      class="message-wrap"
    >
      <CodeInput
        v-model="state.messageCode"
        @submit="handleSubmit"
      />
    </view>
    <view
      v-else
      class="input-wrap"
    >
      <view class="area">
        + 86
      </view>
      <input
        v-model="state.phoneNumber"
        class="input"
        type="number"
        auto-focus="true"
        confirm-type="send"
        adjustPosition=""
        placeholder="请输入您的手机号"
      >
    </view>
    <view class="buttons">
      <template v-if="$env === 'weapp'">
        <button
          class="btn primary-btn-plain"
          open-type="getPhoneNumber"
          hover-class="none"
          onGetPhoneNumber="getUserPhone"
        >
          一键授权手机号
        </button>
        <view class="divider" />
      </template>
      <button
        class="btn primary-btn"
        @tap="sendMessage"
      >
        {{ state.sendMessageTimeout ? `${state.sendMessageTimeout}s后可重新获取` : '获取短信验证码' }}
      </button>
    </view>
    <Dialog v-model="state.showBindOAuth">
      <view class="bind-auth-dialog">
        <view class="tip">
          继续操作前请先绑定{{ $env === 'weapp' ? '微信' : 'QQ' }}号
        </view>
        <button
          class="primary-btn"
          open-type="getUserInfo"
          hover-class="none"
          @getUserInfo="bindUserAction"
        >
          一键授权绑定
        </button>
      </view>
    </Dialog>
  </view>
</template>

<script>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { sendPhoneMessage, bindUser, bindPhone, getWechatPhone, accessLogin } from '~/utils/login'
import toast from '~/utils/toast'
import Dialog from '~/components/dialog'
import CodeInput from './CodeInput'

export default {
  name: 'PhoneCodeBox',
  components: {
    CodeInput,
    Dialog
  },
  props: {
    type: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const store = useStore()
    const state = reactive({
      phoneNumber: '',
      messageCode: '',
      sendMessageTimeout: 0,
      showMessageBox: false,
      showBindOAuth: false
    })

    const getUserPhoneCallback = () => {
      const user = { ...store.state.userInfo }
      user.providers.bind_phone = true
      store.commit('UPDATE_USER_INFO', user)
    }

    const handleSubmit = () => {
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

    const overLoopTimeout = () => {
      if (state.sendMessageTimeout === 1) {
        state.sendMessageTimeout = 0
        return
      }
      setTimeout(() => {
        state.sendMessageTimeout--
        overLoopTimeout()
      }, 1000)
    }

    const getUserPhone = (evt) => {
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

    const sendMessage = () => {
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

    const bindUserAction = (evt) => {
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
        const user = { ...store.state.userInfo }
        user.providers[`bind_${process.env.TARO_ENV}`] = true
        store.commit('UPDATE_USER_INFO', user)
      })
      .catch((err) => {
        toast.info(err.message)
      })
    }

    return {
      state,
      sendMessage,
      getUserPhone,
      handleSubmit,
      bindUserAction
    }
  }
}
</script>
