import Fly from 'flyio/dist/npm/wx'
import cache from '~/utils/cache'

const fly = new Fly()
const isProd = process.env.NODE_ENV === 'production'

fly.interceptors.request.use(request => {
  request.baseURL = isProd
    ? 'https://api.calibur.tv/v1/'
    // : 'https://api.calibur.tv/v1/'
    : 'http://localhost:5200/v1/'
  request.headers['Authorization'] = `Bearer ${cache.get('JWT-TOKEN')}`
  request.timeout = 10000
  return request
})

fly.interceptors.response.use(
  res => res.data.data,
  err => {
    const code = err.status
    const resp = {
      code,
      message: ''
    }
    if (!err.response) {
      resp.message = '网路请求失败'
    } else if (code === 0) {
      resp.message = '网络不稳定！'
    } else if (code === 1) {
      resp.message = '网络太慢了！'
    } else {
      const { message } = err.response.data
      if (typeof message === 'string') {
        resp.message = message
      } else {
        resp.message = message[Object.keys(message)[0]][0]
      }
    }
    return Promise.reject(resp)
  }
)

export default fly
