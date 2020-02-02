import event from '~/utils/event'

export default function flowEvent(Comp) {
  return class extends Comp {
    componentDidMount() {
      event.on(`index-flow-scroll-switch-${this.props.slug}`, () => {
        this.initData()
      })
      event.on(`index-flow-scroll-bottom-${this.props.slug}`, () => {
        this.loadMore()
      })
      if (this.props.autoload) {
        this.initData()
      }
    }

    componentWillUnmount() {
      event.off(`index-flow-scroll-switch-${this.props.slug}`)
      event.off(`index-flow-scroll-bottom-${this.props.slug}`)
    }
  }
}
