import cacheManager from '~/utils/cache'

export const getter = state => name => state[name]

export const setter = state => ({ key, type, value, callback }) => {
  if (type === 0) {
    state[key] = value
  } else if (type === 1) {
    state[key] = {
      ...(state[key] || {}),
      ...value
    }
  }
  callback && callback()
}

export const cache = {
  set({ key, value, timeout }) {
    return new Promise((resolve, reject) => {
      try {
        cacheManager.set(this.key(key), value)
        cacheManager.set(this.key(key, true), Date.now() + timeout * 1000)
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  },

  get({ key }) {
    return new Promise((resolve, reject) => {
      try {
        const expiredAt = cacheManager.get(this.key(key, true))
        const cacheStr = cacheManager.get(this.key(key))
        if (!expiredAt || !cacheStr || Date.now() - expiredAt > 0) {
          this.del(key)
          reject(null)
          return
        }
        resolve(cacheStr)
      } catch (e) {
        this.del(key)
        reject(e)
      }
    })
  },

  del({ key }) {
    cacheManager.remove(this.key(key))
    cacheManager.remove(this.key(key, true))
  },

  key(key, expired = false) {
    return `listview-${key}${expired ? '-t' : ''}`
  }
}
