import { observable, action } from 'mobx'
import { initState, initData, loadMore, updateState } from '@flowlist/js-core'
import * as api from '~/utils/api'
import { setter, getter, cache } from './utils'

class ListStore {
  @observable state = {}

  @action.bound
  initData({ func, type, query, uniqueKey, callback, cacheTimeout }) {
    return initData({
      getter: getter(this.state), setter: setter(this.state), cache,
      api, func, type, query, uniqueKey, callback, cacheTimeout
    })
  }

  @action.bound
  loadMore({ type, func, query, uniqueKey, errorRetry, callback, cacheTimeout }) {
    return loadMore({
      getter: getter(this.state), setter: setter(this.state), cache,
      api, func, type, query, uniqueKey, errorRetry, callback, cacheTimeout
    })
  }

  @action.bound
  initState({ func, type, query }) {
    initState({
      getter: getter(this.state), setter: setter(this.state),
      func, type, query
    })
  }

  @action.bound
  updateState({ type, func, query, id, method, changeKey, value, cacheTimeout, uniqueKey }) {
    updateState({
      getter: getter(this.state), setter: setter(this.state), cache,
      type, func, query, method, value, id, uniqueKey, changeKey, cacheTimeout
    })
  }
}

export default new ListStore()
