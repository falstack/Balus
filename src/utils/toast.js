import Taro from '@tarojs/taro'

export default {
  info(tips) {
    this.stop()
    Taro.showToast({
      title: tips.toString(),
      icon: 'none',
      duration: 2000
    })
  },

  success(tips) {
    this.stop()
    Taro.showToast({
      title: tips.toString(),
      icon: 'success',
      duration: 2000
    })
  },

  loading(tips = '加载中…') {
    this.stop()
    Taro.showLoading({
      title: tips.toString()
    })
  },

  stop() {
    Taro.hideLoading()
    Taro.hideToast()
  }
}
