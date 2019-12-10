import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import http from '~/utils/http'
import UserPanel from './panel/UserPanel'
import './index.scss'

export default class extends Component {
  config = {
    navigationStyle: 'custom'
  }

  constructor(props) {
    super(props)
    this.state = {
      slug: this.$router.params.slug,
      user: null
    }
  }

  componentWillMount() {}

  componentDidMount() {
    this.getUser()
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onReachBottom() {}

  onShareAppMessage() {}

  getUser() {
    http.get(`user/show?slug=${this.state.slug}`)
      .then(user => {
        this.setState({ user })
      })
      .catch(() => {})
  }

  render() {
    const { user } = this.state
    return (
      <View className='public-user-home'>
        <UserPanel user={user} />
      </View>
    )
  }
}
