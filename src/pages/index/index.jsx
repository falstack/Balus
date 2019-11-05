import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtSearchBar } from 'taro-ui'
import './index.scss'

export default class Index extends Component {
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

  handleSearch () {
    console.log('handleSearch')
  }

  handleSearchInput (value) {
    this.setState({
      value
    })
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const tabList = [{ title: '动态' }, { title: '新番榜' }, { title: '总榜单' }]
    return (
      <View>
        <AtSearchBar
          placeholder='搜一下'
          value={this.state.value}
          onChange={this.handleSearchInput.bind(this)}
          onActionClick={this.handleSearch.bind(this)}
        />
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.TabSwitch.bind(this)}>
          <AtTabsPane current={this.state.current} index={0}>
            <View>start</View>
            <View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View><View>动态</View>
            <View>end</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
