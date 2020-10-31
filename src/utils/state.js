import cache from '~/utils/cache'
import event from '~/utils/event'

export default new class {
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
