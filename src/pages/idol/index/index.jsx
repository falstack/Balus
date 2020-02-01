import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtSearchBar, AtLoadMore } from 'taro-ui'
import http from '~/utils/http'
import IndexHelper from '~/components/IndexHelper/index'
import ActiveIdolItem from '~/components/ActiveIdolItem/index'
import TrendIdolItem from '~/components/TrendIdolItem/index'
import './index.scss'

export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tabActiveIndex: 0,
      searchKeyword: '',
      active: {
        loading: false,
        nothing: false,
        noMore: false,
        total: 0,
        page: 1
      },
      release: {
        loading: false,
        nothing: false,
        noMore: false,
        total: 0,
        page: 1
      },
      hottest: {
        loading: false,
        nothing: false,
        noMore: false,
        total: 0,
        page: 1
      },
      list_0: [],
      list_1: [],
      list_2: [],
    }
  }

  config = {
    enablePullDownRefresh: true
  }

  TabSwitch (tabActiveIndex) {
    this.setState({
      tabActiveIndex
    })
    if (this.state[`list_${tabActiveIndex}`].length) {
      return
    }
    this.getIdols(tabActiveIndex)
  }

  onShareAppMessage() {
    return {
      title: '萌市，二次元股市',
      path: '/pages/index/index',
      imageUrl: 'https://m1.calibur.tv/default-poster?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/400'
    }
  }

  componentDidMount() {
    this.getIdols(0)
  }

  onPullDownRefresh() {
    this.getIdols(this.state.tabActiveIndex, true)
  }

  onReachBottom() {
    this.getIdols(this.state.tabActiveIndex)
  }

  getIdols(index, refresh = false) {
    let sort = ''
    if (index === 0) {
      sort = 'active'
    } else if (index === 1) {
      sort = 'release'
    } else {
      sort = 'hottest'
    }
    const data = this.state[sort]
    const field = `list_${index}`
    if (data.loading || data.nothing || (data.noMore && !refresh)) {
      return
    }
    if (refresh) {
      this.setState({
        [sort]: {
          loading: true,
          nothing: false,
          noMore: false,
          total: data.total,
          page: 1
        },
        [field]: []
      })
    } else {
      this.setState({
        [sort]: {
          ...data,
          loading: true
        }
      })
    }
    http
      .get('idol/list', {
        sort,
        take: 10,
        page: refresh ? 1 : data.page
      })
      .then(res => {
        this.batchPatch(field, res.result, sort, {
          loading: false,
          nothing: res.total === 0,
          noMore: res.no_more,
          total: res.total,
          page: data.page + 1
        })
        if (refresh) {
          Taro.stopPullDownRefresh()
        }
      })
      .catch(() => {
        this.setState({
          [sort]: Object.assign(data, {
            loading: false
          })
        })
        if (refresh) {
          Taro.stopPullDownRefresh()
        }
      })
  }

  batchPatch(field, list, sort, meta) {
    http.get('idol/batch_patch', {
      slug: list.map(_ => _.slug).join(',')
    })
      .then(data => {
        Object.keys(data).forEach(key => {
          list.forEach((item, index) => {
            if (item.slug === key) {
              list[index] = {
                ...item,
                ...data[key]
              }
            }
          })
        })
        this.setState({
          [sort]: meta,
          [field]: this.state[field].concat(list)
        })
      })
      .catch(() => {})
  }

  handleSearchAction () {
    if (!this.state.searchKeyword) {
      return
    }
    Taro.navigateTo({
      url: `/pages/search/index?q=${this.state.searchKeyword}`,
      success: () => {
        this.setState({
          searchKeyword: ''
        })
      }
    })
  }

  handleSearchInput (searchKeyword) {
    this.setState({
      searchKeyword
    })
  }

  render () {
    const tabList = [{ title: '动态' }, { title: '连载榜' }, { title: '总榜' }]
    const { active, release, hottest, list_0, list_1, list_2 } = this.state
    const list_0_data = list_0.map((idol, index) => (
      <ActiveIdolItem
        key={idol.slug}
        taroKey={idol.slug}
        index={index}
        idol={idol}
      />
    ))
    const list_1_data = list_1.map((idol, index) => (
      <TrendIdolItem
        key={idol.slug}
        taroKey={idol.slug}
        index={index}
        idol={idol}
      />
    ))
    const list_2_data = list_2.map((idol, index) => (
      <TrendIdolItem
        key={idol.slug}
        taroKey={idol.slug}
        index={index}
        idol={idol}
      />
    ))
    return (
      <View>
        <AtSearchBar
          placeholder='搜一下'
          value={this.state.searchKeyword}
          onChange={this.handleSearchInput.bind(this)}
          onConfirm={this.handleSearchAction.bind(this)}
          onActionClick={this.handleSearchAction.bind(this)}
        />
        <IndexHelper />
        <AtTabs current={this.state.tabActiveIndex} tabList={tabList} onClick={this.TabSwitch.bind(this)}>
          <AtTabsPane current={this.state.tabActiveIndex} index={0}>
            {list_0_data}
            <AtLoadMore
              status={
                active.loading
                  ? 'loading'
                  : active.noMore
                  ? 'noMore'
                  : 'more'
              }
            />
          </AtTabsPane>
          <AtTabsPane current={this.state.tabActiveIndex} index={1}>
            {list_1_data}
            <AtLoadMore
              status={
                release.loading
                  ? 'loading'
                  : release.noMore
                  ? 'noMore'
                  : 'more'
              }
            />
          </AtTabsPane>
          <AtTabsPane current={this.state.tabActiveIndex} index={2}>
            {list_2_data}
            <AtLoadMore
              status={
                hottest.loading
                  ? 'loading'
                  : hottest.noMore
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