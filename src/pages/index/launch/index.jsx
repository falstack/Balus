import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import Navbar from '~/components/Navbar/text'
import PinList from '~/components/ListView/PinList'
import IdolList from '~/components/ListView/IdolList'
import TabHeader from '~/components/Tabbar'
import utils from '~/utils'
import './index.scss'

class indexPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 1,
      tabs: [
        { sort: 'hottest', title: '热门', type: 'pin' },
        { sort: 'activity', title: '动态', type: 'pin' },
        { sort: 'newest', title: '最新', type: 'pin' },
        { sort: 'hottest', title: '股市', type: 'idol' },
      ]
    }
  }

  static options = {
    addGlobalClass: true
  }

  handleTabClick(value) {
    const current = typeof value === 'number' ? value : value.detail.current
    if (current === this.state.current) {
      return
    }
    this.setState({ current })
  }

  getFlowComponent({ title, sort }) {
    switch (title) {
      case '热门': {
        return <PinList query={{ sort, from: 'index', rand_id: utils.getRandId() }} />
      }
      case '动态': {
        return <PinList query={{ sort, from: 'index', rand_id: utils.getRandId() }} />
      }
      case '最新': {
        return <PinList query={{ sort, from: 'index', rand_id: utils.getRandId() }} params={{ showTime: true }} />
      }
      case '股市': {
        return <IdolList query={{ sort, from: 'index' }} />
      }
    }
    return <PinList query={{ sort, from: 'index', rand_id: utils.getRandId() }} />
  }

  render () {
    const { current, tabs } = this.state

    return (
      <View className='launch-page scroll-page'>
        <View className='flex-shrink-0'>
          <Navbar>
            <TabHeader
              list={tabs.map(_ => _.title)}
              scale
              active={current}
              onClick={this.handleTabClick.bind(this)}
            />
          </Navbar>
        </View>
        <View className='flex-grow-1'>
          <Swiper
            className='scroll-wrap'
            current={current}
            autoplay={false}
            duration={300}
            onChange={this.handleTabClick}
          >
            {tabs.map(tab => (
              <SwiperItem key={tab.sort}>
                {this.getFlowComponent(tab)}
              </SwiperItem>
            ))}
          </Swiper>
        </View>
      </View>
    )
  }
}

export default indexPage
