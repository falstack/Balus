import Taro, { Component } from '@tarojs/taro'
import { WebView } from '@tarojs/components'
import helper from '~/utils/helper'

export default class extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    // TODO 支持 navbar 的隐藏
    return (
      <WebView src={helper.webview(decodeURIComponent(this.$router.params.url))} />
    )
  }
}
