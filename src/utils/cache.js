import Taro from '@tarojs/taro'

const Cache = class {
  constructor() {
    this.globalData = {}
  }

  set(key, data, onlyFlash = false) {
    if (onlyFlash) {
      this.globalData[key] = data
      return
    }
    try {
      Taro.setStorageSync(key, data)
    } catch (e) {
      Taro.setStorage({ key, data })
    }
    this.globalData[key] = data
  }

  get(key, def = undefined) {
    const result = this.globalData[key]
    if (result !== undefined) {
      return result
    }
    try {
      const value = Taro.getStorageSync(key)
      console.log(key)
      if (value === '') {
        return def
      }
      if (!this.globalData[key]) {
        this.globalData[key] = value
      }
      return value
    } catch (e) {
      return def
    }
  }

  sortAdd(key, value) {
    const list = this.get(key, [])
    const index = list.indexOf(value)
    if (index !== -1) {
      list.splice(index, 1)
    }
    list.unshift(value)
    this.set(key, list)
    return list
  }

  sortDel(key, value) {
    const list = this.get(key, [])
    const index = list.indexOf(value)
    if (index === -1) {
      return list
    }
    list.splice(index, 1)
    this.set(key, list)
    return list
  }

  remove(key) {
    try {
      Taro.removeStorageSync(key)
    } catch (e) {
      Taro.removeStorage({ key })
    }
    delete this.globalData[key]
  }
}

export default new Cache()
