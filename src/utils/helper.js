import cache from '~/utils/cache'

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
      width = `/w/${options.width}`
      height = options.height ? `/h/${options.height}` : `/h/${options.width}`
    } else {
      width = options.width ? `/w/${options.width}` : ''
      height = options.height ? `/h/${options.height}` : ''
    }

    return `${link}?imageMogr2/auto-orient/strip|imageView2/${mode}${width}${height}${format}`
  },

  number(num) {
    return num > 1000 ? `${Math.floor((num / 1000) * 10) / 10}k` : num
  },

  webview(url) {
    let result
    const user = cache.get('USER', null)
    const token = !user ? '' : cache.get('JWT-TOKEN', '')
    const link = /\?/.test(url) ? '&' : '?'
    result = `${url}${link}token=${token}`

    if (!/^http/.test(url)) {
      result = process.env.NODE_ENV === 'development' ? `http://localhost:3001/${result}` : `https://www.calibur.tv/${result}`
      // result = `https://www.calibur.tv/${result}`
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
