import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import CustomBar from '~/custom-tab-bar'
import event from '~/utils/event'
import pageShare from '~/mixin/pageShare'
import LaunchPage from './launch'
import BangumiPage from './bangumi'
import MessagePage from './message'
import UserPage from './user'
import './index.scss'

@pageShare
class indexPage extends Component {
  config = {
    navigationStyle: 'custom',
    disableScroll: true
  }

  constructor (props) {
    super(props)
    this.state = {
      ...(this.state || {}),
      currentPage: 0,
    }
  }

  componentDidMount() {
    event.on('TAB_SWITCH', (currentPage) => {
      this.setState({ currentPage })
    })
  }

  componentWillUnmount() {
    event.off('TAB_SWITCH')
  }

  render () {
    const { currentPage } = this.state

    return (
      <View className='scroll-page'>
        <View className='flex-grow-1'>
          {
            currentPage === 0 && <LaunchPage />
          }
          {
            currentPage === 1 && <BangumiPage />
          }
          {
            currentPage === 2 && <MessagePage />
          }
          {
            currentPage === 3 && <UserPage />
          }
        </View>
        <View className='flex-shrink-0'>
          <CustomBar />
        </View>
      </View>
    )
  }
}

export default indexPage
