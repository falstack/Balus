<template>
  <view class="guest-panel">
    <view class="login-tips">
      你还没登录呢，喵 o(一︿一+)o
    </view>
    <view class="btn-wrap">
      <button
        class="primary-btn-plain"
        open-type="getUserInfo"
        hover-class="none"
        @getUserInfo="signUpAction"
      >
        注册
      </button>
      <button
        class="primary-btn"
        hover-class="none"
        @tap="signInAction"
      >
        登录
      </button>
    </view>
    <Drawer
      v-model="state.showDrawer"
      size="100%"
    >
      <view class="login-drawer">
        <view class="title">
          登录
        </view>
        <PhoneCodeBox type="sign_up" />
      </view>
    </Drawer>
    <Dialog v-model="state.showDialog">
      <view class="bind-phone-dialog">
        <view class="tip">
          继续操作前请先绑定手机号
        </view>
        <PhoneCodeBox type="bind_phone" />
      </view>
    </Dialog>
  </view>
</template>

<script>
import { reactive } from 'vue'
import Drawer from '~/components/drawer'
import Dialog from '~/components/dialog'
import toast from '~/utils/toast'
import { useStore } from 'vuex'
import { getAuthCode } from '~/utils/login'
import PhoneCodeBox from './PhoneCodeBox'

/**
 * 登录：
 * 使用手机号登录，然后再去绑定微信号，这样用户就可以登录不同的账号了
 * 1. 通过 wx.login 获取 code，为一键授权获取手机号做准备
 * 2. 获取手机号
 * -  如果走一键授权获取手机号，服务端解析出手机号（sign_up）后，返回 phone_number 和 message_code
 * ----------
 * -  如果走短信验证码流程，同样是 sign_up（已经去掉了 must_new 的校验）发验证码
 * -  60s 发一次验证码，这个过程中也可以走一键授权流程，总之要拿到 message_code
 * 3. 客户端拿着返回值走用户注册流程，如果未注册则创建账户，最终都会返回 jwt_token 给客户端
 * 4. 客户端通过 jwt_token 去拿到 user，判断是否 bind_sns
 * 5. 用户绑定成功，即为登录成功了~
 *
 * 注册：
 * 1. 调取 wx.getUserInfo 拿用户信息
 * 2. 走第三方账号的登录注册流程
 * 3. 拿到 user 后，检查是否绑定了手机号
 * 4. 绑定手机号，成功后即为注册完成
 */

export default {
  name: 'GuestPanel',
  components: {
    Drawer,
    Dialog,
    PhoneCodeBox
  },
  setup() {
    const store = useStore()
    const state = reactive({
      showDrawer: false,
      showDialog: false,
    })

    const signInAction = async () => {
      const code = await getAuthCode()
      store.commit('SET_AUTH_CODE', code)
      state.showDrawer = true
    }

    const signUpAction = async (evt) => {
      if (!evt.detail.userInfo) {
        toast.info('授权后才能注册')
        return
      }
      await store.dispatch('userLogin')
      const code = await getAuthCode()
      store.commit('SET_AUTH_CODE', code)
      if (store.getters.isGuest) {
        state.showDialog = true
      }
    }

    return {
      state,
      signUpAction,
      signInAction
    }
  }
}
</script>

<style lang="scss">
.guest-panel {
  width: 420px;
  margin: 0 auto;
  padding-bottom: 120px;

  .login-tips {
    font-size: 30px;
    text-align: center;
  }

  .btn-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;

    .primary-btn,
    .primary-btn-plain {
      border-radius: 10px;
      padding: 0 50px;
      height: 70px;
      line-height: 70px;
      font-size: 30px;
      font-weight: 500;
    }
  }

  .login-drawer {
    width: 500px;
    margin: 0 auto;

    .title {
      text-align: center;
      font-size: 44px;
      margin-bottom: 60px;
    }
  }

  .bind-phone-dialog {
    padding: $container-padding;

    .tip {
      text-align: center;
      padding-bottom: $container-padding;
    }
  }
}
</style>
