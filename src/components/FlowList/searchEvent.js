import event from '~/utils/event'

export default function searchEvent(Comp) {
  return class extends Comp {
    componentDidMount() {
      event.on(`tab-flow-scroll-switch-${this.props.type}`, () => {
        this.initData()
      })
      event.on(`tab-flow-scroll-bottom-${this.props.type}`, () => {
        this.loadMore()
      })
      event.on('search-go', ({ type, keywords }) => {
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
          if (type === this.props.type) {
            this.initData(true)
          } else {
            this.resetStore()
          }
        })
      })
    }

    componentWillUnmount() {
      event.off('search-go')
      event.off(`tab-flow-scroll-switch-${this.props.type}`)
      event.off(`tab-flow-scroll-bottom-${this.props.type}`)
    }
  }
}
