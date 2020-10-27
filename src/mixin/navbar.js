import utils from '~/utils'

export default function navbar(Comp) {
  return class extends Comp {
    constructor(props) {
      super(props)
      this.state = {
        ...(this.state || {}),
        rect: utils.getMenuRect(),
      }
    }

    calcMenuRect() {
      if (this.state.rect) {
        return
      }

      setTimeout(() => {
        const rect = utils.getMenuRect()
        if (!rect) {
          this.calcMenuRect()
          return
        }

        this.setState({
          rect
        })
      }, 5000)
    }
  }
}
