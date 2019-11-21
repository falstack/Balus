import cache from '~/utils/cache'
import event from '~/utils/event'

export default new class {
  updateUserInfo(obj) {
    const user = cache.get('USER')
    if (!user) {
      return
    }
    Object.keys(obj).forEach(key => {
      user[key] = obj[key]
    })
    cache.set('USER', user)
    event.emit('update-user')
  }

  updateUserPocket(amount) {
    const user = cache.get('USER')
    if (!user) {
      return
    }
    const value = Number(amount)
    user.wallet_coin = parseFloat(+user.wallet_coin + value).toFixed(2)
    cache.set('USER', user)
    event.emit('update-user')
  }
}()
