import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import menuRect from '~/mixin/menuRect'
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
      <View className='bangumi-rank'>
        <View className="header" style={`height:${menuRect.header}px;padding-top:${menuRect.top}px`}>
          榜单
        </View>
      </View>
    )
  }
}

export default BangumiRank
