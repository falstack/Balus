import Taro, { Component } from '@tarojs/taro'
import { WebView } from '@tarojs/components'
import utils from '~/utils'

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
      <WebView src={utils.webview(decodeURIComponent(this.$router.params.url))} />
    )
  }
}
