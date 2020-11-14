import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import './index.scss'

class Drawer extends PureComponent {
  clickMask = () => {
    if (!this.props.maskClose) {
      return
    }
    this.closeDrawer()
  }

  closeDrawer = () => {
    this.props.onClose()
  }

  render() {
    if (!this.props.visible) {
      return <View/>
    }

    return (
      <View class="drawer">
        {
          this.props.showMask && <View
            class="drawer__mask"
            onClick={this.clickMask}
          />
        }
        <View
          class="drawer__wrap"
          style={`height: ${this.props.size}`}
        >
          {
            this.props.size === '100%' && <Block>
              <View class="drawer__close">
                <Text className='drawer__close__btn' onClick={this.closeDrawer}>×</Text>
              </View>
              <View class="iphone-top-shim"/>
            </Block>
          }
          {this.props.children}
        </View>
      </View>
    )
  }
}

Drawer.defaultProps = {
  maskClose: true,
  showMask: true,
  visible: false,
  size: '60%',
  from: 'bottom',
  onClose: () => {}
}

export default Drawer
