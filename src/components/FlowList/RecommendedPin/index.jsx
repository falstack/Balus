import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import flowEvent from "../flowEvent"
import './index.scss'

@flowEvent
class RecommendedPin extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () { }

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
