import event from '~/utils/event'
import { flowEventKey } from '~/utils/flow'

export default function flowEvent(Comp) {
  return class extends Comp {
    componentDidMount() {
      event.on(this._CREATE_EVENT_KEY('switch'), (query) => {
        if (!query) {
          this.initData()
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
          this.initData()
        })
      })
      event.on(this._CREATE_EVENT_KEY('bottom'), () => {
        this.loadMore()
      })
      event.on(this._CREATE_EVENT_KEY('refresh'), () => {
        this.initData(true)
      })
      if (this.props.loadBefore) {
        event.on(this._CREATE_EVENT_KEY('top'), () => {
          this.loadBefore()
        })
      }
      if (this.props.clearable) {
        event.on(this._CREATE_EVENT_KEY('clear'), () => {
          this.resetStore()
        })
      }
      if (this.props.autoload) {
        this.initData()
      }
    }

    componentWillUnmount() {
      event.off(this._CREATE_EVENT_KEY('switch'))
      event.off(this._CREATE_EVENT_KEY('refresh'))
      event.off(this._CREATE_EVENT_KEY('bottom'))
      event.off(this._CREATE_EVENT_KEY('clear'))
      event.off(this._CREATE_EVENT_KEY('top'))
    }

    _CREATE_EVENT_KEY(type) {
      return flowEventKey(this.state.flowNamespace, type, this.props.slug)
    }
  }
}
