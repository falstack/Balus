import Taro, { Component } from '@tarojs/taro'
import { WebView } from '@tarojs/components'
import helper from '~/utils/helper'

export default class extends Component {
  config = {
    navigationBarTitleText: '',
    disableScroll: false,
  }

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <WebView src={helper.webview(decodeURIComponent(this.$router.params.url))} />
    )
  }
}
