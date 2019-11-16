import Taro, { Component } from '@tarojs/taro'
import { WebView } from '@tarojs/components'
import helper from '~/utils/helper'
import cache from '~/utils/cache'

export default class extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const token = cache.get('JWT-TOKEN')
    let url = decodeURIComponent(this.$router.params.url)
    if (token) {
      url = /\?/.test(url) ? `${url}&token=${token}` : `${url}?token=${token}`
    }

    return (
      <WebView src={helper.webview(url)} />
    )
  }
}
