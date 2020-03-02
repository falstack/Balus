import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import menuRect from '~/mixin/menuRect'
import BangumiRankList from '~/components/FlowList/BangumiRank'
import './index.scss'

@menuRect
class BangumiRank extends Component {
  config = {
    navigationBarTextStyle: 'white',
    navigationStyle: 'custom'
  }

  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { menuRect } = this.state
    if (!menuRect) {
      return
    }

    return (
      <View className='bangumi-rank scroll-page'>
        <View className="header flex-shrink-0" style={`height:${menuRect.header}px;padding-top:${menuRect.top}px`}>
          榜单
        </View>
        <View className='flex-grow-1'>
          <View className='scroll-wrap'>
            <BangumiRankList />
          </View>
        </View>
      </View>
    )
  }
}

export default BangumiRank
