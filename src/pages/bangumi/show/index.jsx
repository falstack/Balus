import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import http from '~/utils/http'
import TrendIdolItem from '~/components/TrendIdolItem/index'
import BangumiPanel from './panel/BangumiPanel'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      slug: this.$router.params.slug,
      bangumi: {},
      state_idol: {
        loading: false,
        nothing: false,
        noMore: false,
        total: 0,
        page: 0
      },
      list_idol: []
    }
  }

  config = {
    navigationBarTitleText: '',
    navigationStyle: 'custom'
  }

  onShareAppMessage() {
    const { bangumi } = this.state
    return {
      title: bangumi.name,
      path: `/pages/bangumi/show/index?slug=${bangumi.slug}`,
      imageUrl: `${bangumi.avatar}?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/400`
    }
  }

  getBangumiData() {
    http.get('bangumi/show', {
      slug: this.state.slug
    })
      .then(bangumi => {
        this.setState({ bangumi })
        this.patchBangumiData(bangumi)
      })
      .catch(err => {
        console.log(err)
      })
  }

  getBangumiIdols() {
    const { state_idol } = this.state
    if (state_idol.loading || state_idol.noMore) {
      return
    }
    http.get('bangumi/idols', {
      slug: this.state.slug,
      page: state_idol.page
    })
      .then(data => {
        const { list_idol } = this.state
        this.setState({
          state_idol: {
            ...state_idol,
            page: state_idol.page + 1,
            loading: false,
            noMore: data.no_more,
            total: data.total
          },
          list_idol: list_idol.concat(data.result)
        })
      })
      .catch(() => {
        this.setState({
          state_idol: {
            ...state_idol,
            loading: false
          },
        })
      })
  }

  patchBangumiData() {}

  componentWillMount () { }

  componentDidMount () {
    this.getBangumiData()
    this.getBangumiIdols()
  }

  onReachBottom() {
    this.getBangumiIdols()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { bangumi, list_idol } = this.state
    const idol_data = list_idol.map(idol => (
      <TrendIdolItem
        key={idol.slug}
        taroKey={idol.slug}
        index={-1}
        idol={idol}
        inBangumi
      />
    ))
    return (
      <View className='bangumi-show'>
        <BangumiPanel bangumi={bangumi} />
        {
          list_idol.length ?
            <View className='intro'>
              <Text className='intro__title'>偶像列表</Text>
              {idol_data}
            </View> : ''
        }
      </View>
    )
  }
}
