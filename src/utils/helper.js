import cache from '~/utils/cache'
import Taro from '@tarojs/taro'

const adjustDate = (time) => {
  if (/^\d+$/.test(time) && time.toString().length === 10) {
    return new Date(time * 1000)
  }
  let result = new Date(time)
  if (result.toString() === 'Invalid Date') {
    result = new Date(time.replace(/-/g, '/'))
  }
  return result
}
const DPR = (function () {
  try {
    const info = Taro.getSystemInfoSync()
    return info.pixelRatio || 2
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
      width = `/w/${options.width * DPR}`
      height = options.height ? `/h/${options.height * DPR}` : `/h/${options.width * DPR}`
    } else {
      width = options.width ? `/w/${options.width * DPR}` : ''
      height = options.height ? `/h/${options.height * DPR}` : ''
    }

    return `${link}?imageMogr2/auto-orient/strip|imageView2/${mode}${width}${height}${format}`
  },

  getMenuRect() {
    const cacheData = cache.get('MENU-SIZE')
    if (cacheData) {
      return cacheData
    }
    const menuRect = Taro.getMenuButtonBoundingClientRect()
    Taro.getSystemInfo({
      success: res => {
        menuRect.right = res.screenWidth - menuRect.right
        menuRect.header = menuRect.top + menuRect.right + menuRect.height
        cache.set('MENU-SIZE', menuRect)
        return menuRect
      }
    })
  },

  number(num) {
    return num > 1000 ? `${Math.floor((num / 1000) * 10) / 10}k` : num
  },

  timeAgo(time) {
    const date = adjustDate(time)
    const delta = Date.now() - date.getTime()
    const format = [date.getFullYear(), `0${date.getMonth() + 1}`.substr(-2), `0${date.getDate()}`.substr(-2), `0${date.getHours()}`.substr(-2), `0${date.getMinutes()}`.substr(-2)]
    if (delta > 365 * 86400000 || delta <= 0) {
      return `${format[0]}-${format[1]}-${format[2]}`
    }
    const today = new Date().setHours(0, 0, 0, 0)
    if (today < date) {
      return `今天${format[3]}:${format[4]}`
    }
    if (today - 86400000 < date) {
      return `昨天${format[3]}:${format[4]}`
    }
    if (today - 172800000 < date) {
      return `前天${format[3]}:${format[4]}`
    }
    return `${format[1]}-${format[2]} ${format[3]}:${format[4]}`
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
  }
}
