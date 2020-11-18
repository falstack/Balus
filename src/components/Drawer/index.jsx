import Taro, { Component } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import classNames from 'classnames'
import './index.scss'

class Drawer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      closing: false
    }
  }

  clickMask = () => {
    if (!this.props.maskClose) {
      return
    }
    this.closeDrawer()
  }

  closeDrawer = () => {
    this.setState({
      closing: true
    }, () => {
      setTimeout(() => {
        this.props.onClose()
        this.setState({
          closing: false
        })
      }, 300)
    })
  }

  render() {
    if (!this.props.visible) {
      return <View />
    }

    return (
      <View className={classNames('drawer', { 'is-closing': this.state.closing })}>
        {
          this.props.showMask && <View
            className="drawer__mask"
            onClick={this.clickMask}
          />
        }
        <View
          className={classNames('drawer__wrap', `from-${this.props.from}`)}
          style={`height: ${this.props.size}`}
        >
          {
            this.props.size === '100%' && <Block>
              <View className="drawer__close">
                <Text className='drawer__close__btn' onClick={this.closeDrawer}>×</Text>
              </View>
              <View className="iphone-top-shim"/>
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
