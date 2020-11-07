import Taro, { Component } from '@tarojs/taro'
import { WebView } from '@tarojs/components'
import http from '~/utils/http'
import utils from '~/utils'
import './index.scss'

export default class extends Component {
  config = {
    navigationBarTitleText: '',
    disableScroll: false,
  }

  constructor (props) {
    super(props)
    this.state = {
      shareData: {
        title: '咔哩吧 - 你开心就好',
        path: '/pages/index',
        imageUrl: 'https://m1.calibur.tv/default-poster?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/400'
      }
    }
  }

  componentWillMount() {
    this.getData()
  }

  onShareAppMessage() {
    return this.state.shareData
  }

  getData() {
    const { pin } = (this.$router.preload || {})
    const handler = pin => {
      this.setState({
        shareData: {
          title: `「${pin.badge}」${pin.title.text}`,
          path: `/pages/pin/show/index?slug=${pin.slug}`,
          imageUrl: pin.banner.length
            ? `${pin.banner[0].url}?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/400`
            : `${pin.author.avatar}?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/400`
        }
      })
    }

    if (pin) {
      handler(pin)
      return
    }

    http.get(`pin/show?slug=${this.$router.params.slug}`)
      .then(handler)
      .catch(() => {})
  }

  render () {
    return (
      <WebView src={utils.webview(`pin/${this.$router.params.slug}`)} />
    )
  }
}
