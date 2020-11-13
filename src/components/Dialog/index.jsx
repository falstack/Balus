import Taro, { PureComponent } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

class Dialog extends PureComponent {
  constructor(props) {
    super(props)
  }

  clickMask = () => {
    if (!this.props.maskClose) {
      return
    }
    this.closeDialog()
  }

  closeDialog = () => {
    this.props.onClose()
  }

  render () {
    if (!this.props.visible) {
      return <View />
    }

    return (
      <View class="dialog">
        {
          this.props.showMask && <View
            class="dialog__mask"
            onClick={this.clickMask}
          />
        }
        <View class="dialog__wrap">
          {this.props.children}
        </View>
      </View>
    )
  }
}

Dialog.defaultProps = {
  maskClose: true,
  showMask: true,
  visible: false,
  onClose: () => {}
}

export default Dialog
