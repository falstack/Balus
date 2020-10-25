import cache from '~/utils/cache'
import utils from '~/utils'
import './index.scss'

export default function blurPage(Comp) {
  return class extends Comp {
    constructor(props) {
      super(props)
      this.state = {
        rect: cache.get('menu-bar-rect'),
      }
    }

    componentDidMount () {
      this.calcMenuRect()
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
