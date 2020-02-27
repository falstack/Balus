export default function blurPage(Comp) {
  return class extends Comp {
    constructor(props) {
      super(props)
      this.state = {
        collapsedHeader: false,
        scrollActive: false,
      }
    }

    onReachBottom() {
      this.setState({
        scrollActive: true
      })
    }

    onPageScroll(evt) {
      const collapsedHeader = evt.scrollTop > 100
      if (collapsedHeader !== this.state.collapsedHeader) {
        this.setState({
          collapsedHeader
        })
      }
      const scrollActive = evt.scrollTop > 0
      if (scrollActive !== this.state.scrollActive) {
        this.setState({
          scrollActive
        })
      }
    }
  }
}
