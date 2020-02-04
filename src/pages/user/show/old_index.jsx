import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtLoadMore } from 'taro-ui'
import http from '~/utils/http'
import TrendIdolItem from '~/components/TrendIdolItem/index'
import BangumiRankItem from "~/components/BangumiRankItem";
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
      tabActiveIndex: 0,
      state_idol: {
        loading: false,
        nothing: false,
        noMore: false,
        total: 0,
        page: 0
      },
      state_bangumi: {
        loading: false,
        nothing: false,
        noMore: false,
        total: 0,
        page: 1
      },
      list_0: [],
      list_1: []
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

  TabSwitch (tabActiveIndex) {
    this.setState({
      tabActiveIndex
    })
    if (this.state[`list_${tabActiveIndex}`].length) {
      return
    }
    if (tabActiveIndex === 0) {
      this.getUserIdols()
    } else if (tabActiveIndex === 1) {
      this.getLikerBangumi()
    }
  }

  onReachBottom() {
    const index = this.state.tabActiveIndex
    if (index === 0) {
      this.getUserIdols()
    } else if (index === 1) {
      this.getLikerBangumi()
    }
  }

  getLikerBangumi() {
    const { state_bangumi } = this.state
    if (state_bangumi.loading || state_bangumi.noMore) {
      return
    }
    http.get('user/like_bangumi', {
      slug: this.state.slug,
      page: state_bangumi.page
    })
      .then(data => {
        const { list_1 } = this.state
        this.setState({
          state_bangumi: {
            ...state_bangumi,
            page: state_bangumi.page + 1,
            loading: false,
            noMore: data.no_more,
            total: data.total
          },
          list_1: list_1.concat(data.result)
        })
      })
      .catch(() => {
        this.setState({
          state_bangumi: {
            ...state_bangumi,
            loading: false
          },
        })
      })
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
        const { list_0 } = this.state
        this.setState({
          state_idol: {
            ...state_idol,
            page: state_idol.page + 1,
            loading: false,
            noMore: data.no_more,
            total: data.total
          },
          list_0: list_0.concat(data.result)
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
    const { user, state_idol, state_bangumi, list_0, list_1 } = this.state
    const tabList = [{ title: '偶像' }, { title: '番剧' }]
    const idol_data = list_0.map(idol => (
      <TrendIdolItem
        key={idol.slug}
        taroKey={idol.slug}
        index={-1}
        idol={idol}
        inBangumi
      />
    ))
    const like_bangumi_data = list_1.map(bangumi => (
      <BangumiRankItem
        key={bangumi.slug}
        taroKey={bangumi.slug}
        bangumi={bangumi}
      />
    ))
    return (
      <View className='public-user-home'>
        <UserPanel user={user} />
        <AtTabs current={this.state.tabActiveIndex} tabList={tabList} onClick={this.TabSwitch.bind(this)}>
          <AtTabsPane current={this.state.tabActiveIndex} index={0}>
            {idol_data}
            <AtLoadMore
              status={
                state_idol.loading
                  ? 'loading'
                  : state_idol.noMore
                  ? 'noMore'
                  : 'more'
              }
            />
          </AtTabsPane>
          <AtTabsPane current={this.state.tabActiveIndex} index={1}>
            {like_bangumi_data}
            <AtLoadMore
              status={
                state_bangumi.loading
                  ? 'loading'
                  : state_bangumi.noMore
                  ? 'noMore'
                  : 'more'
              }
            />
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
