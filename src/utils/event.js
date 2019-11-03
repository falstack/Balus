export default new class {
  constructor() {
    this.all = {}
  }

  on(type, handler) {
    if (!this.all[type]) {
      this.all[type] = []
    }
    this.all[type].push(handler)
  }

  off(type, handler) {
    if (this.all[type]) {
      if (handler) {
        this.all[type].splice(this.all[type].indexOf(handler) >>> 0, 1)
      } else {
        this.all[type] = []
      }
    }
  }

  emit(type, ...args) {
    ;(this.all[type] || []).map(handler => {
      handler(...args)
    })
  }
}()
