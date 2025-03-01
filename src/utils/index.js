import cache from '~/utils/cache'
import Taro from '@tarojs/taro'

const systemInfo = Taro.getSystemInfoSync()

cache.set('SYSTEM_INFO', systemInfo)

const DPR = (function () {
  try {
    return parseInt(systemInfo.pixelRatio || 2)
  } catch (e) {
    return 2
  }
})()

export default {
  resize(url, options = {}) {
    if (!url) {
      return ''
    }

    if (/imageMogr2/.test(url)) {
      return url
    }

    const link = /^http/.test(url) ? url : `https://m1.calibur.tv/${url}`

    const format = '/format/png'
    const mode = options.mode === undefined ? 1 : options.mode

    if ((mode === 1 && !options.width) || (!options.width && !options.height)) {
      return `${link}?imageMogr2/auto-orient/strip${format}`
    }

    let width
    let height

    if (mode === 1) {
      width = `/w/${options.width * DPR | 0}`
      height = options.height ? `/h/${options.height * DPR | 0}` : `/h/${options.width * DPR | 0}`
    } else {
      width = options.width ? `/w/${options.width * DPR | 0}` : ''
      height = options.height ? `/h/${options.height * DPR | 0}` : ''
    }

    return `${link}?imageMogr2/auto-orient/strip|imageView2/${mode}${width}${height}${format}`
  },

  getMenuRect() {
    const cacheKey = 'MENU-BAR-RECT'
    const cacheVal = cache.get(cacheKey)
    if (cacheVal) {
      return cacheVal
    }

    const menuRect = Taro.getMenuButtonBoundingClientRect()
    const margin = menuRect.top - systemInfo.statusBarHeight
    const height = menuRect.height
    const width = menuRect.left

    const rect = {
      width,
      height,
      margin,
      navbar: systemInfo.statusBarHeight + height + margin * 2
    }

    if (!rect.width || !rect.height || !rect.margin) {
      return null
    }

    cache.set(cacheKey, rect)

    return rect
  },

  debounce(wait, func1, func2) {
    let lastTime
    let timeout
    return function () {
      if (lastTime && Date.now() - lastTime < wait) {
        lastTime = Date.now()
        timeout && clearTimeout(timeout)
        timeout = setTimeout(() => {
          func1()
        }, wait)
        return
      }
      lastTime = Date.now()
      func2 ? func2() : func1()
    }
  },

  getRandId() {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9][Math.random() * 9 | 0]
  },

  throttle(fn, gapTime) {
    if (gapTime === null || gapTime === undefined) {
      gapTime = 1500
    }
    let _lastTime = null
    return function () {
      let _nowTime = new Date()
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
        _lastTime = _nowTime
        fn.apply(this, arguments)
      }
    }
  },

  number(num) {
    return num > 1000 ? `${Math.floor((num / 1000) * 10) / 10}k` : num
  },

  pad(number) {
    return number < 10 ? '0' + number : number
  },

  timeAgo(time) {
    if (!time) {
      return ''
    }
    const date = this.adjustDate(time)
    const today = new Date().setHours(0, 0, 0, 0)
    const obj = this.parseDateProps(time)
    if (today < date) {
      return `今天${this.pad(obj.hour)}:${this.pad(obj.minutes)}`
    }
    if (today - 86400000 < date) {
      return `昨天${this.pad(obj.hour)}:${this.pad(obj.minutes)}`
    }
    if (today - 172800000 < date) {
      return `前天${this.pad(obj.hour)}:${this.pad(obj.minutes)}`
    }
    const delta = Date.now() - date.getTime()
    if (delta > 86400000 * 365) {
      return `${delta / (86400000 * 365) | 0}年前`
    }
    if (delta > 86400000 * 30) {
      return `${delta / (86400000 * 30) | 0}个月前`
    }
    return `${delta / (86400000) | 0}天前`
  },

  adjustDate(time) {
    if (!time) {
      return null
    }
    if (/^\d+$/.test(time)) {
      if (time.toString().length === 10) {
        return new Date(time * 1000)
      }
      return new Date(+time)
    }
    let result = new Date(time)
    if (result.toString() === 'Invalid Date') {
      result = new Date(time.replace(/-/g, '/'))
    }
    return result
  },

  parseDateProps(time) {
    if (!time) {
      return null
    }
    const date = this.adjustDate(time)
    if (!date) {
      return null
    }

    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
    }
  },

  formatTime(ts, type = 'ymd') {
    const obj = this.parseDateProps(ts)
    if (!obj) {
      return ''
    }
    if (type === 'ymd') {
      return `${obj.year}-${obj.month}-${obj.day}`
    }

    if (type === 'md') {
      return `${obj.month}-${obj.day}`
    }

    return obj.year
  },

  webview(url) {
    let result
    const token = cache.get('JWT-TOKEN', 'LOGOUT')
    const link = /\?/.test(url) ? '&' : '?'
    result = `${url}${link}token=${token}`

    if (!/^http/.test(url)) {
      // result = process.env.NODE_ENV === 'development' ? `http://localhost:3001/${result}` : `https://app.calibur.tv/${result}`
      result = `https://app.calibur.tv/${result}`
    }

    return result
  },

  calculate(val) {
    return val ? parseFloat(val).toFixed(2) : '0.00'
  },

  hasRole(role) {
    const user = cache.get('USER')
    if (!user) {
      return false
    }
    if (user.is_admin) {
      return true
    }
    const roles = cache.get('USER_ROLES', [])
    return ~roles.indexOf(role)
  },

  back(url = '/pages/index/index') {
    if (Taro.getCurrentPages().length <= 1) {
      Taro.switchTab({ url })
      return
    }
    Taro.navigateBack({
      delta: 1
    }).then(() => {}).catch(() => {
      Taro.switchTab({ url })
    })
  },

  maskTel(tel) {
    if (!tel) {
      return tel
    }
    return tel.substring(0, 3) + '****' + tel.substr(tel.length - 4)
  }
}
