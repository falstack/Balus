import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import CustomBar from '~/custom-tab-bar'
import event from '~/utils/event'
import share from '~/mixin/share'
import LaunchPage from './launch'
import BangumiPage from './bangumi'
import MessagePage from './message'
import UserPage from './user'
import './index.scss'

@share
class indexPage extends Component {
  config = {
    navigationStyle: 'custom',
    disableScroll: true
  }

  constructor (props) {
    super(props)
    this.state = {
      ...(this.state || {}),
      loadedPages: [0],
      currentPage: 0,
    }
  }

  componentDidMount() {
    event.on('TAB_SWITCH', (currentPage) => {
      const { loadedPages } = this.state
      if (loadedPages.indexOf(currentPage) === -1) {
        loadedPages.push(currentPage)
      }
      this.setState({ currentPage, loadedPages })
    })
  }

  componentWillUnmount() {
    event.off('TAB_SWITCH')
  }

  render () {
    const { currentPage, loadedPages } = this.state

    return (
      <View className='scroll-page'>
        <View style={`display:${currentPage === 0 ? 'block' : 'none'}`} className='flex-grow-1'>
          {
            loadedPages.indexOf(0) !== -1 && <LaunchPage />
          }
        </View>
        <View style={`display:${currentPage === 1 ? 'block' : 'none'}`} className='flex-grow-1'>
          {
            loadedPages.indexOf(1) !== -1 && <BangumiPage />
          }
        </View>
        <View style={`display:${currentPage === 2 ? 'block' : 'none'}`} className='flex-grow-1'>
          {
            loadedPages.indexOf(2) !== -1 && <MessagePage />
          }
        </View>
        <View style={`display:${currentPage === 3 ? 'block' : 'none'}`} className='flex-grow-1'>
          {
            loadedPages.indexOf(3) !== -1 && <UserPage />
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
