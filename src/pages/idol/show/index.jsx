import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import http from '~/utils/http'
import helper from '~/utils/helper'
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
      },
      fans_total: 0,
      fans_noMore: false,
      fans_data: []
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

  getIdolFans() {
    http.get('idol/fans', {
      slug: this.state.slug,
      page: 0,
      take: 5
    })
      .then(data => {
        this.setState({
          fans_total: data.total,
          fans_noMore: data.no_more,
          fans_data: data.result
        })
      })
      .catch(() => {})
  }

  componentDidMount () {
    this.getIdolData()
    this.getIdolFans()
  }

  render () {
    const { idol, fans_data } = this.state
    const avatar = fans_data.map(user => (
      <Image
        className='avatar'
        src={helper.resize(user.avatar, { width: 140 })}
        key={user.slug}
        taroKey={user.slug}
        mode='aspectFit'
      />
    ))
    return (
      <View className='idol-show'>
        <IdolPanel idol={idol} />
        <View className='intro'>
          <Text className='intro__title'>{idol.bangumi.name} {idol.name}</Text>
        </View>
        <View className='intro avatar-list'>
          {avatar}
        </View>
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
