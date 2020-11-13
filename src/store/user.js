import { observable, computed, action } from 'mobx'
import http from '~/utils/http'
import cache from '~/utils/cache'
import toast from '~/utils/toast'
import { oAuthLogin, getUserRole, logoutAction } from '~/utils/login'

class UserStore {
  @observable info = null
  @observable roles = []
  @observable authCode = ''

  @computed get isGuest() {
    if (!this.info) {
      return true
    }

    if (!this.info.providers || !this.info.providers.bind_phone) {
      return true
    }

    return Object.values(this.info.providers).filter(_ => _).length < 2
  }

  @computed get slug() {
    return this.info ? this.info.slug : ''
  }

  @action.bound
  updateUserPocket(amount) {
    this.info.wallet_coin = +parseFloat(
      +this.info.wallet_coin + Number(amount)
    ).toFixed(2)
  }

  @action.bound
  updateUserInfo(info) {
    this.info = {
      ...this.info,
      ...info
    }
  }

  @action.bound
  delUserSign() {
    const handler = () => {
      cache.remove('JWT-TOKEN')
      this.info = {}
    }

    http.post('door/logout')
      .then(handler)
      .catch(handler)
  }

  @action.bound
  setAuthCode(code) {
    this.authCode = code
  }

  @action.bound
  refreshUser() {
    http.get('user/patch', {
      slug: this.info.slug
    })
      .then(user => {
        this.info = {
          ...this.info,
          ...user
        }
      })
      .catch(() => {})
  }

  @action.bound
  userLogin() {
    return new Promise((resolve, reject) => {
      oAuthLogin()
        .then(user => {
          this.info = user
          if (user && user.title.length) {
            getUserRole()
              .then(roles => {
                this.roles = roles
              })
          }
          resolve()
        })
        .catch((err) => {
          toast.info('登录失败，请稍后再试~')
          cache.remove('JWT-TOKEN')
          reject(err)
        })
    })
  }

  @action.bound
  userLogout() {
    logoutAction()
    cache.remove('JWT-TOKEN')
    this.info = null
  }

  @action.bound
  getUserInfo() {
    http
      .post('door/get_user_info')
      .then(user => {
        if (user && user.title.length) {
          // http.get('user/roles')
          //   .then(roles => {
          //     cache.set('USER_ROLES', roles)
          //   })
          //   .catch(() => {})
        }
        this.info = user
      })
      .catch(err => {
        if (err.code === 401) {
          cache.remove('JWT-TOKEN')
        }
      })
  }
}

export default new UserStore()
