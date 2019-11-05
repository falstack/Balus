import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtSearchBar } from 'taro-ui'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      value: ''
    }
  }

  TabSwitch (value) {
    this.setState({
      current: value
    })
  }

  handleSearchAction() {

  }

  handleSearchInput (value) {
    this.setState({
      value
    })
  }

  render () {
    const tabList = [{ title: '综合' }, { title: '偶像' }, { title: '番剧' }, { title: '用户' }]
    return (
      <View>
        <AtSearchBar
          fixed
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
          <AtTabsPane current={this.state.current} index={2}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={3}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
