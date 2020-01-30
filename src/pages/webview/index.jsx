import Taro, { Component } from '@tarojs/taro'
import { WebView } from '@tarojs/components'
import helper from '~/utils/helper'

export default class extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <WebView src={helper.webview(decodeURIComponent(this.$router.params.url))} />
    )
  }
}
