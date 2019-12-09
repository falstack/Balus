import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import http from '~/utils/http'
import helper from '~/utils/helper'
import TrendIdolItem from '~/components/TrendIdolItem/index'
import BangumiPanel from './panel/BangumiPanel'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      slug: this.$router.params.slug,
      showEdit: false,
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
            noMore: data.noMore,
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
    this.setState({
      showEdit: helper.hasRole('update_bangumi')
    })
  }

  onReachBottom() {
    this.getBangumiIdols()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { bangumi, list_idol, showEdit } = this.state
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
        <View className='social-panel intro'>
          {
            showEdit ? <Navigator hover-class='none' url={`/pages/webview/index?url=${encodeURIComponent('app/bangumi/edit?slug=' + bangumi.slug)}`}>
              <AtIcon className='pink-icon' value='settings' size='15' color='#fff' />
            </Navigator> : ''
          }
        </View>
        {
          bangumi.intro ?
            <View className='intro'>
              <Text className='intro__title'>番剧简介</Text>
              <Text className='intro__text'>{bangumi.intro}</Text>
            </View> : ''
        }
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
