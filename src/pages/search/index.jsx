import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtSearchBar } from 'taro-ui'
import http from '~/utils/http'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    const { q } = this.$router.params
    this.state = {
      current: 0,
      value: q,
      lastQuery: q,
      state_idol: {
        loading: false,
        nothing: false,
        noMore: false,
        total: 0,
        page: 1
      },
      state_bangumi: {
        loading: false,
        nothing: false,
        noMore: false,
        total: 0,
        page: 1
      },
      list_idol: [],
      list_bangumi: []
    }
  }

  componentDidMount() {
    this.loadMore(0)
  }

  TabSwitch (value) {
    this.setState({
      current: value
    })
    this.loadMore(value)
  }

  handleSearchAction() {
    const { value, lastQuery } = this.state
    if (value === lastQuery) {
      return
    }
    this.setState({
      current: 0,
      lastQuery: value,
      state_idol: {
        loading: false,
        nothing: false,
        noMore: false,
        total: 0,
        page: 1
      },
      state_bangumi: {
        loading: false,
        nothing: false,
        noMore: false,
        total: 0,
        page: 1
      },
      list_idol: [],
      list_bangumi: []
    })
    this.loadMore(0, true)
  }

  loadMore (index, refresh = false) {
    let type = 'all'
    if (index === 0) {
      type = 'idol'
    } else if (index === 1) {
      type = 'bangumi'
    }
    const stateField = `state_${type}`
    const stateData = this.state[stateField]
    if (stateData.loading || stateData.nothing || stateData.noMore) {
      return
    }
    this.setState({
      [stateField]: {
        ...stateData,
        loading: true
      }
    })
    http
      .get('search/mixin', {
        q: this.state.value,
        type,
        page: refresh ? 1 : stateData.page
      })
      .then(res => {
        const dataField = `list_${type}`
        this.setState({
          [stateField]: {
            loading: false,
            nothing: false,
            noMore: res.noMore,
            total: res.total,
            page: stateData.page + 1
          },
          [dataField]: this.state[dataField].concat(res.result)
        })
      })
  }

  handleSearchInput (value) {
    this.setState({
      value
    })
  }

  render () {
    const tabList = [{ title: '偶像' }, { title: '番剧' }]
    return (
      <View>
        <AtSearchBar
          placeholder='搜一下'
          value={this.state.value}
          onChange={this.handleSearchInput.bind(this)}
          onActionClick={this.handleSearchAction.bind(this)}
        />
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.TabSwitch.bind(this)}>
          <AtTabsPane current={this.state.current} index={0}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页一的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
