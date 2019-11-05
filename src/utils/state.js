import cache from '~/utils/cache'
import event from '~/utils/event'
import toast from '~/utils/toast'

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

  updateUserExp({ exp, message }, info = {}) {
    const user = cache.get('USER')
    if (!user) {
      return
    }
    const { level, have_exp, next_level_exp } = user.exp
    let newLevel, newExp, newTotal
    if (have_exp + exp >= next_level_exp) {
      newLevel = level + 1
      newExp = have_exp + exp - next_level_exp
      newTotal = newLevel * (newLevel + 10)
    } else {
      newLevel = level
      newExp = have_exp + exp
      newTotal = next_level_exp
    }
    this.updateUserInfo({
      ...info,
      exp: {
        level: newLevel,
        have_exp: newExp,
        next_level_exp: newTotal
      }
    })
    toast.info(message)
  }

  updateUserPocket(amount) {
    const user = cache.get('USER')
    if (!user) {
      return
    }
    const value = Number(amount)
    user.pocket = +user.pocket + value
    user.balance.coin_count = +user.balance.coin_count + value
    cache.set('USER', user)
    event.emit('update-user')
  }
}()
