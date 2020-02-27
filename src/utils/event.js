export default new class {
  constructor() {
    this.all = {}
  }

  on(type, handler) {
    console.log('on', type)
    if (!this.all[type]) {
      this.all[type] = []
    }
    this.all[type].push(handler)
  }

  off(type, handler) {
    console.log('off', type)
    if (this.all[type]) {
      if (handler) {
        this.all[type].splice(this.all[type].indexOf(handler) >>> 0, 1)
      } else {
        this.all[type] = []
      }
    }
  }

  emit(type, ...args) {
    console.log('emit', type)
    ;(this.all[type] || []).map(handler => {
      handler(...args)
    })
  }
}()
