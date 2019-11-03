import Taro from '@tarojs/taro'

export default {
  info(tips) {
    this.stop()
    Taro.showToast({
      title: tips,
      icon: 'none',
      duration: 2000
    })
  },

  success(tips) {
    this.stop()
    Taro.showToast({
      title: tips,
      icon: 'success',
      duration: 2000
    })
  },

  loading(tips = '加载中…') {
    this.stop()
    Taro.showLoading({
      title: tips
    })
  },

  stop() {
    Taro.hideLoading()
    Taro.hideToast()
  }
}
