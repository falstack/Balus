import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import http from '~/utils/http'
import IdolPanel from './panel/IdolPanel'
import IdolBottom from './bottom/IdolBottom'
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
    navigationBarTitleText: '',
    navigationStyle: 'custom'
  }

  getIdolData() {
    http.get('idol/show', {
      slug: this.state.slug
    })
      .then(idol => {
        this.setState({ idol })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount () {
    this.getIdolData()
  }

  render () {
    const { idol } = this.state
    return (
      <View>
        <IdolPanel idol={idol} />
        <IdolBottom idol={idol} />
      </View>
    )
  }
}
