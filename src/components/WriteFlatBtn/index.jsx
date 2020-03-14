import Taro, { Component } from '@tarojs/taro'
import { Navigator } from '@tarojs/components'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <Navigator
        hover-class='none'
        className='write-flat-btn'
        url={`/pages/webview/index?url=${encodeURIComponent('write/pin')}`}
      >
        <View className='right' />
        <View className='left' />
      </Navigator>
    )
  }
}
