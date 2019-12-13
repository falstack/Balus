import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import http from '~/utils/http'
import TrendIdolItem from '~/components/TrendIdolItem/index'
import UserPanel from './panel/UserPanel'
import './index.scss'

export default class extends Component {
  config = {
    navigationStyle: 'custom'
  }

  constructor(props) {
    super(props)
    this.state = {
      slug: this.$router.params.slug,
      user: null,
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

  componentWillMount() {}

  onShareAppMessage() {
    const { user } = this.state
    return {
      title: user.nickname,
      path: `/pages/user/show/index?slug=${user.slug}`,
      imageUrl: `${user.avatar}?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/400`
    }
  }

  componentDidMount() {
    this.getUser()
    this.getUserIdols()
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onReachBottom() {
    this.getUserIdols()
  }

  getUserIdols() {
    const { state_idol } = this.state
    if (state_idol.loading || state_idol.noMore) {
      return
    }
    http.get('user/idols', {
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

  getUser() {
    http.get(`user/show?slug=${this.state.slug}`)
      .then(user => {
        this.setState({ user })
      })
      .catch(() => {})
  }

  render() {
    const { user, list_idol } = this.state
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
      <View className='public-user-home'>
        <UserPanel user={user} />
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
