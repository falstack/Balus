import http from '~/utils/http'
import { isArray, computeResultLength, generateRequestParams, setReactivityField, defaultFlowField } from '~/utils/flow'
import * as API from '~/utils/api'

export default function flowStore(Comp) {
  return class extends Comp {
    constructor(props) {
      super(props)
      this.state = { ...defaultFlowField }
    }

    initData(refresh = false) {
      if ((this.state.flow_fetched || this.state.flow_error) && !refresh) {
        return
      }
      if (this.state.flow_loading) {
        return
      }
      this._SET_FLOW_LOADING()
      const flowReq = this.state.flowReq
      const params = generateRequestParams(refresh ? defaultFlowField : this.state, flowReq.query, flowReq.type)
      const request = /\//.test(flowReq.url) ? http.get(flowReq.url, params) : API[flowReq.url](params)
      request
        .then(data => {
          this._SET_FLOW_DATA(data, params, flowReq, refresh)
        })
        .catch(err => {
          this._SET_FLOW_ERROR(err)
        })
    }

    loadMore(force = false, insertBefore = false) {
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
      params.is_up = insertBefore ? 1: 0
      const request = /\//.test(flowReq.url) ? http.get(flowReq.url, params) : API[flowReq.url](params)
      request
        .then(data => {
          this._SET_FLOW_DATA(data, params, flowReq)
        })
        .catch(err => {
          this._SET_FLOW_ERROR(err)
        })
    }

    loadBefore() {
      this.loadMore(false, true)
    }

    resetStore() {
      this.setState({ ...defaultFlowField })
    }

    _SET_FLOW_DATA(data, params, req, refresh = false) {
      const { result, extra } = data
      const state = {
        flow_loading: false,
        flow_total: data.total,
        flow_noMore: req.type === 'jump' ? false : data.no_more,
        flow_page: typeof params.page === 'number' ? params.page : typeof params.page === 'string' ? +params.page : 1,
        flow_result: setReactivityField(refresh ? [] : this.state.flow_result, result, req.type, !!params.is_up)
      }
      if (refresh || !this.state.flow_fetched) {
        state.flow_fetched = true
        state.flow_nothing = computeResultLength(result) === 0
      }
      if (extra) {
        state.flow_extra = setReactivityField(refresh ? null : this.state.flow_extra, extra, req.type, !!params.is_up)
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
