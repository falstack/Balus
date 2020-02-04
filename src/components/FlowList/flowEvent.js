import event from '~/utils/event'

export default function flowEvent(Comp) {
  return class extends Comp {
    componentDidMount() {
      event.on(`tab-flow-scroll-switch-${this.props.slug}`, () => {
        this.initData()
      })
      event.on(`tab-flow-scroll-bottom-${this.props.slug}`, () => {
        this.loadMore()
      })
      if (this.props.autoload) {
        this.initData()
      }
    }

    componentWillUnmount() {
      event.off(`tab-flow-scroll-switch-${this.props.slug}`)
      event.off(`tab-flow-scroll-bottom-${this.props.slug}`)
    }
  }
}
