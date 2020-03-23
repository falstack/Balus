import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import http from '~/utils/http'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    http.get('message/history', {
      channel: this.$router.params.channel
    })
      .then(res => {
        console.log(res)
      })
      .catch(() => {})
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View>
        <Text>text</Text>
      </View>
    )
  }
}
