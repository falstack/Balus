import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import flowEvent from '../flowEvent'
import flowStore from '../flowStore'
import './index.scss'

@flowStore
@flowEvent
class ActivityIdol extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowReq: {
        url: '',
        type: '',
        query: {}
      }
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View>
        <View>偶像</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>end</View>
      </View>
    )
  }
}

ActivityIdol.defaultProps = {
  slug: 'idol',
  autoload: false
}

export default ActivityIdol
