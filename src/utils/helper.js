import cache from '~/utils/cache'

export default {
  resize(url, options = {}) {
    if (!url) {
      return ''
    }

    if (/imageMogr2/.test(url)) {
      return url
    }

    const link = /^http/.test(url) ? url : `https://image.calibur.tv/${url}`

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
    result = `${url}${link}token=${token}&from=wxapp`
    const isProd = process.env.NODE_ENV === 'production'

    if (!/^http/.test(url)) {
      result = `${
        isProd ? 'https://m.calibur.tv' : 'http://localhost:3001'
        }/${result}`
    }

    return result
  }
}