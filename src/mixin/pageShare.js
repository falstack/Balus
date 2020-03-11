export default function pageShare(Comp) {
  return class extends Comp {
    constructor(props) {
      super(props)
      this.state = {
        shareData: {
          title: '咔哩吧 - 你开心就好',
          path: '/pages/index/index',
          imageUrl: 'https://m1.calibur.tv/default-poster?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/400'
        }
      }
    }

    onShareAppMessage(res) {
      const result = this.state.shareData

      if (res.from === 'menu') {
        return result
      }

      const { dataset = {} } = res.target

      return {
        title: dataset.title || result.title,
        path: dataset.path || result.path,
        imageUrl: `${dataset.imageUrl}?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/400` || result.imageUrl
      }
    }
  }
}
