import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    const { params } = this.$router
    this.state = {
      slug: params.slug,
      type: params.type,
      list_state: {
        loading: false,
        nothing: false,
        noMore: false,
        total: 0,
        page: 0
      },
      list_data: []
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  getUsers() {

  }

  render () {
    return (
      <View>
        user list
      </View>
    )
  }
}
