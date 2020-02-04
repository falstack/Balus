import event from '~/utils/event'

export default function flowEvent(Comp) {
  return class extends Comp {
    componentDidMount() {
      event.on(`${this.props.flowPrefix || 'tab'}-flow-scroll-switch-${this.props.slug}`, () => {
        this.initData()
      })
      event.on(`${this.props.flowPrefix || 'tab'}-flow-scroll-bottom-${this.props.slug}`, () => {
        this.loadMore()
      })
      event.on('search-go', ({ slug, keywords }) => {
        if (this.props.flowPrefix !== 'search') {
          return
        }
        const { flowReq } = this.state
        this.setState({
          flowReq: {
            ...flowReq,
            query: {
              ...flowReq.query,
              q: keywords
            }
          }
        }, () => {
          if (!keywords) {
            this.resetStore()
            return
          }
          if (slug === this.props.slug) {
            this.initData(true)
          } else {
            this.resetStore()
          }
        })
      })
      if (this.props.autoload) {
        this.initData()
      }
    }

    componentWillUnmount() {
      event.off('search-go')
      event.off(`${this.props.flowPrefix || 'tab'}-flow-scroll-switch-${this.props.slug}`)
      event.off(`${this.props.flowPrefix || 'tab'}-flow-scroll-bottom-${this.props.slug}`)
    }
  }
}
