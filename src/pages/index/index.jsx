import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import { AtTabs } from 'taro-ui'
import SearchCustomHeader from '~/components/SearchCustomHeader/index'
import './index.scss'

export default class extends Component {
  config = {
    navigationStyle: 'custom',
    disableScroll: true
  }

  constructor (props) {
    super(props)
    this.state = {
      current: 1,
      tabs: [
        { title: '标签页1' },
        { title: '标签页2' },
        { title: '标签页3' },
        { title: '标签页4' },
        { title: '标签页5' },
        { title: '标签页6' }
      ]
    }
  }

  handleTabClick(value) {
    const current = typeof value === 'number' ? value : value.detail.current
    this.setState({
      current
    })
  }

  render () {
    const { current, tabs } = this.state
    const panels = tabs.map(tab => (
      <SwiperItem
        key={tab}
        taroKey={tab}
      >
        <ScrollView className='scroll-view' scrollY>
          <View>start</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>end</View>
        </ScrollView>
      </SwiperItem>
    ))
    return (
      <View className='homepage scroll-page'>
        <View className='flex-shrink-0'>
          <SearchCustomHeader />
        </View>
        <View className='flex-shrink-0'>
          <AtTabs
            current={current}
            scroll
            tabList={tabs}
            onClick={this.handleTabClick.bind(this)}
          />
        </View>
        <View className='flex-grow-1'>
          <Swiper
            className='scroll-wrap'
            current={current}
            autoplay={false}
            skipHiddenItemLayout
            onChange={this.handleTabClick.bind(this)}
          >
            {panels}
          </Swiper>
        </View>
      </View>
    )
  }
}
