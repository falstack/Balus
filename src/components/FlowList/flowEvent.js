import event from '~/utils/event'
import { flowEventKey } from '~/utils/flow'

export default function flowEvent(Comp) {
  return class extends Comp {
    componentDidMount() {
      event.on(this._CREATE_EVENT_KEY('switch'), () => {
        this.initData()
      })
      event.on(this._CREATE_EVENT_KEY('bottom'), () => {
        this.loadMore()
      })
      if (this.props.loadBefore) {
        event.on(this._CREATE_EVENT_KEY('top'), () => {
          this.loadBefore()
        })
      }
      if (this.props.autoload) {
        this.initData()
      }
    }

    componentWillUnmount() {
      event.off(this._CREATE_EVENT_KEY('switch'))
      event.off(this._CREATE_EVENT_KEY('bottom'))
      event.off(this._CREATE_EVENT_KEY('top'))
    }

    _CREATE_EVENT_KEY(type) {
      return flowEventKey(this.state.flowNamespace, type, this.props.slug)
    }
  }
}
