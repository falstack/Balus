import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import flowEvent from '../flowEvent'
import flowStore from '../flowStore'
import './index.scss'

@flowStore
@flowEvent
class RecommendedPin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.state,
      flowReq: {
        url: 'bangumi/recommended_pins',
        type: 'seenIds',
        query: {}
      }
    }
  }

  componentWillMount () {}

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View>
        <View>推荐</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>123</View><View>end</View>
      </View>
    )
  }
}

RecommendedPin.defaultProps = {
  slug: 'recommended',
  autoload: true
}

export default RecommendedPin
