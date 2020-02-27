import utils from '~/utils'

export default function menuRect(Comp) {
  return class extends Comp {
    constructor(props) {
      super(props)
      this.state = {
        menuRect: null
      }
    }

    componentWillMount() {
      this._GET_MENU_RECT()
    }

    _GET_MENU_RECT() {
      const menuRect = utils.getMenuRect()
      if (!menuRect) {
        setTimeout(() => {
          this._GET_MENU_RECT()
        }, 200)
        return
      }
      this.setState({
        menuRect
      })
    }
  }
}
