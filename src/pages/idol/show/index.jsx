import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import http from '~/utils/http'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      slug: this.$router.params.slug,
      idol: {
        bangumi: {},
        lover: null
      }
    }
  }

  config = {
    navigationBarTitleText: ''
  }

  getIdolData() {
    http.get('idol/show', {
      slug: this.state.slug
    })
      .then(idol => {
        this.setState({ idol })
        Taro.setNavigationBarTitle({
          title: idol.name
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount () {
    this.getIdolData()
  }

  render () {
    return (
      <View>
        <Text>idol show</Text>
      </View>
    )
  }
}
