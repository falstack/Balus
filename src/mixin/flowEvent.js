import event from '~/utils/event'
import { flowEventKey } from '~/utils/flow'

export default function flowEvent(Comp) {
  return class extends Comp {
    componentWillMount() {
      if (this.props.switch) {
        event.on(this._CREATE_EVENT_KEY('switch'), (query) => {
          const isForce = !!this.props.reload
          if (!query) {
            this.initData(isForce)
            return
          }
          const flowReq = this.state.flowReq
          this.setState({
            flowReq: {
              ...flowReq,
              query: {
                ...flowReq.query,
                ...query
              }
            }
          }, () => {
            this.initData(isForce)
          })
        })
      }
      if (this.props.bottom) {
        event.on(this._CREATE_EVENT_KEY('bottom'), () => {
          this.loadMore()
        })
      }
      if (this.props.refresh) {
        event.on(this._CREATE_EVENT_KEY('refresh'), () => {
          if (this.handleRefresh) {
            this.handleRefresh(() => { this.initData(true) })
          } else {
            this.initData(true)
          }
        })
      }
      if (this.props.clear) {
        event.on(this._CREATE_EVENT_KEY('clear'), () => {
          this.resetStore()
        })
      }
      if (this.props.before) {
        event.on(this._CREATE_EVENT_KEY('top'), () => {
          this.loadBefore()
        })
      }
      if (this.props.append) {
        event.on(this._CREATE_EVENT_KEY('append'), (data) => {
          this.appendStore(data)
        })
      }
      if (this.props.autoload) {
        this.initData()
      }
    }

    componentDidShow() {
      if (this.state.flow_fetched && this.props.reload) {
        this.initData(true)
      }
    }

    componentWillUnmount() {
      event.off(this._CREATE_EVENT_KEY('switch'))
      event.off(this._CREATE_EVENT_KEY('refresh'))
      event.off(this._CREATE_EVENT_KEY('bottom'))
      event.off(this._CREATE_EVENT_KEY('top'))
      event.off(this._CREATE_EVENT_KEY('clear'))
      event.off(this._CREATE_EVENT_KEY('append'))
    }

    _CREATE_EVENT_KEY(type) {
      return flowEventKey(this.state.flowNamespace, type, this.props.slug)
    }
  }
}
