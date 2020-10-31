import Taro from '@tarojs/taro'
import http from '~/utils/http'
import cache from '~/utils/cache'

export const oAuthLogin = () => {
  return new Promise((resolve, reject) => {
    step_1_get_wx_code()
      .then(code => {
        step_2_get_token_or_user_by_code(code)
          .then(resp => {
            if (resp.type === 'token') {
              step_5_set_user_token(resp.data)
              resolve()
            } else {
              step_3_get_secret_data_from_wechat()
                .then(user => {
                  step_4_get_user({
                    user: user.userInfo,
                    signature: user.signature,
                    iv: user.iv,
                    encrypted_data: user.encryptedData,
                    session_key: resp.data,
                    app_name: 'moe_idol'
                  })
                    .then(token => {
                      step_5_set_user_token(token)
                      resolve()
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

export const accessLogin = (form, isLogin = true) => {
  return new Promise((resolve, reject) => {
    step_0_get_jwt_token_by_access(form, isLogin)
      .then(token => {
        step_5_set_user_token(token)
        resolve()
      })
      .catch(reject)
  })
}

const step_1_get_wx_code = () => {
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

const step_2_get_token_or_user_by_code = code => {
  return new Promise((resolve, reject) => {
    const url = process.env.TARO_ENV === 'weapp' ? 'door/wechat_mini_app_get_token' : 'door/qq_mini_app_get_token'
    http
      .post(url, { code, app_name: 'moe_idol' })
      .then(key => {
        resolve(key)
      })
      .catch(reject)
  })
}

const step_3_get_secret_data_from_wechat = () => {
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

const step_4_get_user = form => {
  const url = process.env.TARO_ENV === 'weapp' ? 'door/wechat_mini_app_login' : 'door/qq_mini_app_login'
  return http.post(url, form)
}

const step_5_set_user_token = token => {
  cache.set('JWT-TOKEN', token)
}

const step_0_get_jwt_token_by_access = (form, isLogin) => {
  return new Promise((resolve, reject) => {
    http
      .post(isLogin ? 'door/login' : 'door/register', form)
      .then(token => {
        resolve(token)
      })
      .catch(reject)
  })
}
