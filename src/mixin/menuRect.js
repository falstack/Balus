import utils from '~/utils'

export default function menuRect(Comp) {
  return class extends Comp {
    constructor(props) {
      super(props)
      this.state = {
        menuRect: utils.getMenuRect()
      }
    }

    componentDidMount() {
      this._GET_MENU_RECT()
    }

    _GET_MENU_RECT() {
      if (this.state.menuRect) {
        return
      }
      const result = utils.getMenuRect()
      if (!result) {
        setTimeout(() => {
          this._GET_MENU_RECT()
        }, 200)
        return
      }
      this.setState({
        menuRect: result
      })
    }
  }
}
