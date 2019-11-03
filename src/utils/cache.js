import Taro from '@tarojs/taro'

const globalData = {}

export default {
  set(key, data) {
    try {
      Taro.setStorageSync(key, data)
    } catch (e) {
      Taro.setStorage({ key, data })
    }
    globalData[key] = data
  },

  get(key, def = undefined) {
    const result = globalData[key]
    if (result !== undefined) {
      return result
    }
    try {
      const value = Taro.getStorageSync(key)
      if (value === '') {
        return def
      }
      return value
    } catch (e) {
      return def
    }
  },

  remove(key) {
    try {
      Taro.removeStorageSync(key)
    } catch (e) {
      Taro.removeStorage({ key })
    }
    delete globalData[key]
  }
}
