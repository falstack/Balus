import { useLocalStore, observer } from '@tarojs/mobx'
import { initData, loadMore, updateState, utils } from '@flowlist/js-core'
import { setter, getter, cache } from './utils'

export const createStore = () => useLocalStore(() => ({
  state: utils.generateDefaultField(),
  initData({ func, type, query, uniqueKey, callback, cacheTimeout }) {
    return initData({
      getter: getter(this.state), setter: setter(this.state), cache,
      func, type, query, uniqueKey, callback, cacheTimeout
    })
  },
  loadMore({ type, func, query, uniqueKey, errorRetry, callback, cacheTimeout }) {
    return loadMore({
      getter: getter(this.state), setter: setter(this.state), cache,
      func, type, query, uniqueKey, errorRetry, callback, cacheTimeout
    })
  },
  updateState({ type, func, query, id, method, changeKey, value, cacheTimeout, uniqueKey }) {
    updateState({
      getter: getter(this.state), setter: setter(this.state), cache,
      type, func, query, method, value, id, uniqueKey, changeKey, cacheTimeout
    })
  }
}))

export const createComponent = observer
