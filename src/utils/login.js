import http from '~/utils/http'
import cache from '~/utils/cache'
import event from '~/utils/event'

export const wechatLogin = () => {
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
                    session_key: resp.data
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
    wx.login({
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
    http
      .post('door/wechat_mini_app_get_token', { code, id: 1 })
      .then(key => {
        resolve(key)
      })
      .catch(reject)
  })
}

const step_3_get_secret_data_from_wechat = () => {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
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
    http
      .post('door/wechat_mini_app_login', form)
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
      .post('door/current_user')
      .then(user => {
        cache.set('USER', user)
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
