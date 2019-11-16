import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtSearchBar } from 'taro-ui'
import './index.scss'

export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tabActiveIndex: 0,
      searchKeyword: ''
    }
  }

  TabSwitch (tabActiveIndex) {
    this.setState({
      tabActiveIndex
    })
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

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const tabList = [{ title: '动态' }, { title: '连载榜' }, { title: '总榜' }]
    return (
      <View>
        <AtSearchBar
          placeholder='搜一下'
          value={this.state.searchKeyword}
          onChange={this.handleSearchInput.bind(this)}
          onActionClick={this.handleSearchAction.bind(this)}
        />
        <AtTabs current={this.state.tabActiveIndex} tabList={tabList} onClick={this.TabSwitch.bind(this)}>
          <AtTabsPane current={this.state.tabActiveIndex} index={0}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页一的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.tabActiveIndex} index={1}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.tabActiveIndex} index={2}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
