import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtLoadMore } from 'taro-ui'
import BangumiRankItem from "~/components/BangumiRankItem";
import http from '~/utils/http'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      nothing: false,
      noMore: false,
      total: 0,
      page: 0,
      list: []
    }
  }

  onReachBottom() {
    this.getData()
  }

  getData() {
    if (this.state.noMore || this.state.loading) {
      return
    }
    this.setState({
      loading: true
    })
    const { page, list } = this.state
    http.get('bangumi/rank', {
      page
    })
      .then(data => {
        this.setState({
          loading: false,
          list: list.concat(data.result),
          noMore: data.no_more,
          total: data.total,
          page: page + 1
        })
      })
      .catch(() => {
        this.setState({
          loading: false
        })
      })
  }

  componentWillMount () {
    this.getData()
  }

  onShareAppMessage() {
    return {
      title: '动漫排行榜',
      path: '/pages/bangumi/list/index',
      imageUrl: 'https://m1.calibur.tv/default-poster?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/400'
    }
  }

  render () {
    const { list, loading, noMore } = this.state
    const data_list = list.map((bangumi, index) => (
      <BangumiRankItem
        index={index}
        bangumi={bangumi}
        key={bangumi.slug}
        taroKey={bangumi.slug}
      />
    ))
    return (
      <View>
        {data_list}
        <AtLoadMore
          status={
            loading
              ? 'loading'
              : noMore
              ? 'noMore'
              : 'more'
          }
        />
      </View>
    )
  }
}
