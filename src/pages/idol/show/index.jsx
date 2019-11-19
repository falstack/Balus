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
        this.patchIdolData(idol)
      })
      .catch(err => {
        console.log(err)
      })
  }

  patchIdolData(idol) {
    http.get('idol/patch', {
      slug: this.state.slug
    })
      .then(data => {
        this.setState({
          idol: {
            ...idol,
            ...data
          }
        })
      })
      .catch(() => {})
  }

  componentDidMount () {
    this.getIdolData()
  }

  render () {
    const { idol } = this.state
    return (
      <View className='idol-show'>
        <IdolPanel idol={idol} />
        {
          idol.intro ?
            <View className='intro'>
              <Text className='intro__title'>角色详情</Text>
              <Text className='intro__text'>{idol.intro}</Text>
            </View> : ''
        }
        <IdolBottom idol={idol} />
      </View>
    )
  }
}
