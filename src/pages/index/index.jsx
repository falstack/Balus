import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import toast from '~/utils/toast'
import { AtTabs, AtTabsPane, AtTabBar, AtSearchBar } from 'taro-ui'
import './index.scss'

export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      value: ''
    }
  }

  config = {
    navigationBarTitleText: '首页'
  }

  TabSwitch (value) {
    this.setState({
      current: value
    })
    toast.info(value)
  }

  navigateSwitch (value) {
    console.log(value)
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
    const tabList = [{ title: '动态' }, { title: '周榜' }, { title: '总榜' }]
    return (
      <View>
        <AtSearchBar
          placeholder='搜一下'
          value={this.state.value}
          onChange={this.handleSearchInput.bind(this)}
          onActionClick={this.handleSearch.bind(this)}
        />
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.TabSwitch.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} >
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;' >标签页一的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
          </AtTabsPane>
        </AtTabs>
        <AtTabBar
          fixed
          tabList={[
            { title: '榜单', iconType: 'clock', text: 'new' },
            { title: '番剧', iconType: 'camera', dot: true },
            { title: '名厨', iconType: 'link', text: '100', max: 99 },
            { title: '我的', iconType: 'home', text: '100', max: 99 }
          ]}
          onClick={this.navigateSwitch}
          current={0}
        />
      </View>
    )
  }
}
