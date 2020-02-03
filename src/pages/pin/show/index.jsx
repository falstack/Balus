import Taro, { Component } from '@tarojs/taro'
import { WebView } from '@tarojs/components'
import http from '~/utils/http'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      shareData: {
        title: '萌市，二次元股市',
        path: '/pages/index/index',
        imageUrl: 'https://m1.calibur.tv/default-poster?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/400'
      }
    }
  }

  componentDidMount () {
    this.getData()
  }

  onShareAppMessage() {
    return this.state.shareData
  }

  getData() {
    http.get(`pin/show?slug=${this.$router.params.slug}`)
      .then(data => {
        this.setState({
          shareData: {
            title: `「${data.badge}」${data.title.text}`,
            path: `/pages/pin/show/index?slug=${data.slug}`,
            imageUrl: data.banner.length
              ? `${data.banner[0].url}?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/400`
              : `${data.author.avatar}?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/400`
          }
        })
      })
      .catch(() => {})
  }

  render () {
    return (
      <WebView src={`https://app.calibur.tv/pin/${this.$router.params.slug}`} />
    )
  }
}
