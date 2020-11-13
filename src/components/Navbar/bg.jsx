import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { wrapStyle, coreStyle, shimStyle } from './utils'
import classNames from 'classnames'
import utils from '~/utils'
import navbar from '~/mixin/navbar'

@navbar
class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...(this.state || {}),
      isBlur: false,
    }
  }

  static options = {
    addGlobalClass: true
  }

  componentDidMount () {
    this.calcMenuRect()
    this.addScrollListener()
  }

  componentWillUnmount() {
    this.ob && this.ob.disconnect()
  }

  addScrollListener() {
    this.ob = Taro.createIntersectionObserver(this.$scope, {
      thresholds: [1, 0.5],
      initialRatio: 1
    })

    this.ob.relativeToViewport({ bottom: 0 }).observe('.navbar', utils.throttle((e) => {
      if (e.intersectionRatio > 0.9) {
        this.setState({
          isBlur: false
        })
        return
      }
      const { isBlur } = this.state
      this.setState({
        isBlur: !isBlur
      })
    }, 100))
  }

  render () {
    return (
      <View className='navbar'>
        <View className="navbar__header">
          <View
            style={wrapStyle(this.state)}
            className="navbar__wrap"
          >
            <View
              style={coreStyle(this.state)}
              className='navbar__core has-bg'
            >
              <Text className='iconfont ic-left' onClick={() => {utils.back()}} />
              <View className={classNames('navbar__title', { 'has-blur': this.state.isBlur })}>
                <Text className='line'>|</Text>
                <Text className='title'>{this.props.title}</Text>
              </View>
            </View>
          </View>
          <View
            style={shimStyle(this.state)}
            className='navbar__shim has-bg'
          >
            <View className={classNames('navbar__bg', { 'has-blur': this.state.isBlur }, { 'use-blur': this.props.blur })}>
              <Image
                className='image'
                mode="aspectFill"
                src={utils.resize(this.props.background, { mode: 0, width: 375 })}
              />
            </View>
            <View className="navbar__mask" />
            <View className={classNames('navbar__body', { 'has-blur': this.state.isBlur })}>
              {this.props.children}
            </View>
          </View>
        </View>
      </View>
    )
  }
}

Navbar.defaultProps = {
  blur: false,
  title: '',
  background: ''
}

export default Navbar
