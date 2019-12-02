import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import http from '~/utils/http'
import BangumiPanel from './panel/BangumiPanel'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      slug: this.$router.params.slug,
      bangumi: {}
    }
  }

  config = {
    navigationBarTitleText: '',
    navigationStyle: 'custom'
  }

  getBangumiData() {
    http.get('bangumi/show', {
      slug: this.state.slug
    })
      .then(bangumi => {
        this.setState({ bangumi })
        this.patchBangumiData(bangumi)
      })
      .catch(err => {
        console.log(err)
      })
  }

  patchBangumiData() {}

  componentWillMount () { }

  componentDidMount () {
    this.getBangumiData()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { bangumi } = this.state
    return (
      <View className='bangumi-show'>
        <BangumiPanel bangumi={bangumi} />
      </View>
    )
  }
}
