import Taro from '@tarojs/taro'

export default new class {
  constructor() {
    this.debug = process.env.NODE_ENV === 'development'
  }

  on(type, handler) {
    this.debug && console.log('on', type)
    Taro.eventCenter.on(type, handler)
  }

  off(type, handler) {
    this.debug && console.log('off', type)
    Taro.eventCenter.off(type, handler)
  }

  emit(type, ...args) {
    this.debug && console.log('emit', type);
    Taro.eventCenter.trigger(type, ...args)
  }
}()
