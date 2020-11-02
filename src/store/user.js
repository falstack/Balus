import { observable, action } from 'mobx'
import http from '~/utils/http'
import cache from '~/utils/cache'

class UserStore {
  @observable isLogin = false
  @observable info = {}

  @action.bound
  updateUserPocket(amount) {
    this.info.wallet_coin = +parseFloat(
      +state.info.wallet_coin + Number(amount)
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
      this.isLogin = false
      this.info = {}
    }

    http.post('door/logout')
      .then(handler)
      .catch(handler)
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
        this.isLogin = true
      })
      .catch(err => {
        if (err.code === 401) {
          cache.remove('JWT-TOKEN')
        }
      })
  }
}

export default new UserStore()
