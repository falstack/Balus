import cache from '~/utils/cache'
import Taro from '@tarojs/taro'

const request = (method, path, data, config) => {
  return new Promise((resolve, reject) => {
    const header = {
      ...(config.header || {}),
      'Authorization': `Bearer ${cache.get('JWT-TOKEN')}`
    }
    const url = /^http/.test(path) ? path : `https://api.calibur.tv/v1/${path}`
    Taro.request({
      ...config,
      url,
      data,
      header,
      method,
      success: res => {
        if (res.statusCode < 200 || res.statusCode >= 400) {
          reject(res.data)
          return
        }
        resolve(res.data.data)
      },
      fail: err => {
        const code = err.status
        const resp = {
          code,
          message: '网络错误'
        }
        try {
          resp.message = err.response.data.message || ''
          resp.message = resp.message || '网络错误'
          if (code === 0) {
            resp.message = '网络不稳定！'
          } else if (code === 1) {
            resp.message = '网络太慢了！'
          }
        } catch (e) {
          // do nothing
        }
        reject(resp)
      }
    })
  })
}

const Http = {
  get(url, params, config = {}) {
    return request('GET', url, params, config)
  },

  post(url, params, config = {}) {
    return request('POST', url, params, config)
  }
}

export default Http
