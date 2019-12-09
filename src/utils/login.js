import http from '~/utils/http'
import cache from '~/utils/cache'
import event from '~/utils/event'

const globalEnv = process.env.TARO_ENV === 'weapp' ? wx : qq

export const oAuthLogin = () => {
  return new Promise((resolve, reject) => {
    step_1_get_wx_code()
      .then(code => {
        step_2_get_token_or_user_by_code(code)
          .then(resp => {
            if (resp.type === 'token') {
              step_5_get_current_user(resp.data)
                .then(resolve)
                .catch(reject)
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
                      step_5_get_current_user(token)
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

export const accessLogin = form => {
  return new Promise((resolve, reject) => {
    step_0_get_jwt_token_by_access(form)
      .then(token => {
        step_5_get_current_user(token)
          .then(resolve)
          .catch(reject)
      })
      .catch(reject)
  })
}

const step_1_get_wx_code = () => {
  return new Promise((resolve, reject) => {
    globalEnv.login({
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
    globalEnv.getUserInfo({
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
  return new Promise((resolve, reject) => {
    const url = process.env.TARO_ENV === 'weapp' ? 'door/wechat_mini_app_login' : 'door/qq_mini_app_login'
    http
      .post(url, form)
      .then(data => {
        resolve(data)
      })
      .catch(reject)
  })
}

const step_5_get_current_user = token => {
  cache.set('JWT-TOKEN', token)
  return new Promise((resolve, reject) => {
    http
      .post('door/get_user_info')
      .then(user => {
        cache.set('USER', user)
        if (user && user.title.length) {
          step_6_get_user_roles()
        }
        event.emit('update-user')
        resolve(user)
      })
      .catch(reject)
  })
}

const step_0_get_jwt_token_by_access = form => {
  return new Promise((resolve, reject) => {
    http
      .post('door/login', form)
      .then(token => {
        resolve(token)
      })
      .catch(reject)
  })
}

export const step_6_get_user_roles = () => {
  http.get('user/roles')
    .then(roles => {
      cache.set('USER_ROLES', roles)
    })
    .catch(() => {})
}
