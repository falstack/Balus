import http from '~/utils/http'

const isArray = data => Object.prototype.toString.call(data) === '[object Array]'

const getObjectDeepValue = (field, keys) => {
  if (!keys) {
    return field
  }
  let result = field
  const keysArr = isArray(keys) ? keys : keys.split('.')
  keysArr.forEach(key => {
    result = result[key]
  })
  return result
}

const computeResultLength = data => {
  let result = 0
  if (isArray(data)) {
    result = data.length
  } else {
    Object.keys(data).forEach(key => {
      result += data[key].length
    })
  }
  return result
}

const generateRequestParams = (field, query, type) => {
  const result = {}
  if (field.flow_fetched) {
    const changing = query.changing || 'slug'
    if (type === 'seenIds') {
      result.seen_ids = field.flow_result.map(_ => getObjectDeepValue(_, changing)).join(',')
    } else if (type === 'lastId') {
      result.last_id = getObjectDeepValue(field.flow_result[field.flow_result.length - 1], changing)
    } else if (type === 'sinceId') {
      result.since_id = getObjectDeepValue(query.is_up ? field.flow_result[0] : field.flow_result[field.flow_result.length - 1], changing)
      result.is_up = query.is_up ? 1 : 0
    } else if (type === 'jump') {
      result.page = query.page || 1
    } else {
      result.page = field.flow_page + 1
    }
  } else {
    if (type === 'seenIds') {
      result.seen_ids = ''
    } else if (type === 'lastId') {
      result.last_id = 0
    } else if (type === 'sinceId') {
      result.since_id = query.sinceId || (query.is_up ? 999999999 : 0)
      result.is_up = query.is_up ? 1 : 0
    } else if (type === 'jump') {
      result.page = query.page || 1
    } else {
      result.page = 1
    }
  }
  return Object.assign(query, result)
}

const setReactivityField = (oldVal, newVal, type, insertBefore ) => {
  if (oldVal) {
    if (type === 'jump' || !isArray(newVal)) {
      return newVal
    } else {
      return insertBefore ? newVal.concat(oldVal) : oldVal.concat(newVal)
    }
  } else {
    return newVal
  }
}

export default function flowStore(Comp) {
  return class extends Comp {
    constructor(props) {
      super(props)
      this.state = {
        flow_result: [],
        flow_noMore: false,
        flow_nothing: false,
        flow_loading: false,
        flow_fetched: false,
        flow_error: null,
        flow_extra: null,
        flow_page: 0,
        flow_total: 0
      }
    }

    initData(refresh = false) {
      if (this.state.flow_error && !refresh) {
        return
      }
      if (this.state.flow_loading || this.state.flow_fetched) {
        return
      }
      this._SET_FLOW_LOADING()
      const flowReq = this.state.flowReq
      const params = generateRequestParams(this.state, flowReq.query, flowReq.type)
      http.get(flowReq.url, params)
        .then(data => {
          this._SET_FLOW_DATA(data, params, flowReq)
        })
        .catch(err => {
          this._SET_FLOW_ERROR(err)
        })
    }

    loadMore(force = false) {
      if (this.state.flow_loading || this.state.flow_nothing || (this.state.flow_noMore && !force)) {
        return
      }
      const flowReq = this.state.flowReq
      if (flowReq.type === 'jump' && +flowReq.query.page === this.state.flow_page) {
        return
      }
      this._SET_FLOW_LOADING()
      if (flowReq.type === 'jump' || !isArray(this.state.flow_result)) {
        this._CLEAR_FLOW_DATA()
      }
      const params = generateRequestParams(this.state, flowReq.query, flowReq.type)
      http.get(flowReq.url, params)
        .then(data => {
          this._SET_FLOW_DATA(data, params, flowReq)
        })
        .catch(err => {
          this._SET_FLOW_ERROR(err)
        })
    }

    _SET_FLOW_DATA(data, params, req) {
      const { result, extra } = data
      const state = {
        flow_loading: false,
        flow_total: data.total,
        flow_noMore: req.type === 'jump' ? false : data.no_more,
        flow_page: typeof params.page === 'number' ? params.page : typeof params.page === 'string' ? +params.page : 1,
        flow_result: setReactivityField(this.state.flow_result, result, req.type, !!req.query.is_up)
      }
      if (!this.state.flow_fetched) {
        state.flow_fetched = true
        state.flow_nothing = computeResultLength(result) === 0
      }
      if (extra) {
        state.flow_extra = setReactivityField(this.state.flow_extra, extra, req.type, !!req.query.is_up)
      }
      this.setState(state)
    }

    _SET_FLOW_LOADING() {
      this.setState({
        flow_loading: true,
        flow_error: null
      })
    }

    _SET_FLOW_ERROR(err) {
      this.setState({
        flow_loading: false,
        flow_error: err
      })
    }

    _CLEAR_FLOW_DATA() {
      this.setState({
        flow_result: [],
        flow_extra: null
      })
    }
  }
}
