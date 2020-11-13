import Taro from '@tarojs/taro'
import http from '~/utils/http'
import cache from '~/utils/cache'

const env = process.env.TARO_ENV

const step_0_get_jwt_token_by_access = form => {
  return http.post(form.isRegister ? 'door/register' : 'door/login', form)
}

const step_2_get_token_or_user_by_code = code => {
  return http.post(`door/${env}_mini_app_get_token`, { code, app_name: 'moe_idol' })
}

const step_3_get_secret_data_from_system = () => {
  return new Promise((resolve, reject) => {
    Taro.getUserInfo({
      withCredentials: true,
      success(data) {
        resolve(data)
      },
      fail() {
        reject()
      }
    })
  })
}

const step_4_exec_user_info = form => http.post(`door/${env}_mini_app_login`, form)

export const getAuthCode = () => {
  return new Promise((resolve, reject) => {
    Taro.login({
      success(data) {
        if (data.code) {
          resolve(data.code)
        } else {
          reject()
        }
      },
      fail() {
        reject('')
      }
    })
  })
}

export const oAuthLogin = () => {
  return new Promise((resolve, reject) => {
    getAuthCode()
      .then(code => {
        step_2_get_token_or_user_by_code(code)
          .then(resp => {
            if (resp.type === 'token') {
              cache.set('JWT-TOKEN', resp.data)
              getUserInfo()
                .then(resolve)
                .catch(reject)
            } else {
              step_3_get_secret_data_from_system()
                .then(user => {
                  step_4_exec_user_info({
                    user: user.userInfo,
                    signature: user.signature,
                    iv: user.iv,
                    encrypted_data: user.encryptedData,
                    session_key: resp.data,
                    app_name: 'moe_idol'
                  })
                    .then(token => {
                      cache.set('JWT-TOKEN', token)
                      getUserInfo()
                        .then(resolve)
                        .catch(reject)
                    })
                    .catch(reject)
                })
                .catch(reject)
            }
          })
          .catch(reject)
      })
      .catch(reject)
  })
}

export const getWechatPhone = (form) => http.post('door/get_wechat_phone', {
  ...form,
  app_name: 'moe_idol'
})

export const bindPhone = ({ phone, authCode }) => http.post('door/bind_phone', {
  phone,
  authCode
})

export const bindUser = (form) => {
  return new Promise((resolve, reject) => {
    getAuthCode()
      .then(code => {
        http.post(`door/bind_${env}_user`, {
          ...form,
          code,
          app_name: 'moe_idol'
        })
          .then(resolve)
          .catch(reject)
      })
      .catch(reject)
  })
}

export const accessLogin = (form) => {
  return new Promise((resolve, reject) => {
    step_0_get_jwt_token_by_access(form)
      .then(token => {
        cache.set('JWT-TOKEN', token)
        getUserInfo().then(resolve).catch(reject)
      })
      .catch(reject)
  })
}

export const getUserInfo = () => http.post('door/get_user_info')

export const getUserRole = () => http.get('user/roles')

export const logoutAction = () => http.post('door/logout')

export const sendPhoneMessage = (phone_number, type) => http.post('door/message', {
  type,
  phone_number
})
