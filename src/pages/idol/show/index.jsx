import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Navigator } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import http from '~/utils/http'
import helper from '~/utils/helper'
import BangumiRankItem from "~/components/BangumiRankItem"
import IdolPanel from './panel/IdolPanel'
import IdolBottom from './bottom/IdolBottom'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      slug: this.$router.params.slug,
      showEdit: false,
      collapsedHeader: false,
      idol: {
        bangumi: {},
        lover: null
      },
      fans_data: []
    }
  }

  config = {
    navigationBarTitleText: '',
    navigationStyle: 'custom'
  }

  onShareAppMessage() {
    const { idol } = this.state
    return {
      title: idol.name,
      path: `/pages/idol/show/index?slug=${idol.slug}`,
      imageUrl: `${idol.avatar}?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/400`
    }
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

  onPageScroll(evt) {
    const collapsedHeader = evt.scrollTop > 100
    if (collapsedHeader !== this.state.collapsedHeader) {
      this.setState({
        collapsedHeader
      })
    }
    const scrollActive = evt.scrollTop > 0
    if (scrollActive !== this.state.scrollActive) {
      this.setState({
        scrollActive
      })
    }
  }

  getIdolFans() {
    http.get('idol/fans', {
      slug: this.state.slug,
      page: 1,
      take: 5
    })
      .then(data => {
        this.setState({
          fans_data: data.result
        })
      })
      .catch(() => {})
  }

  handleBuyStock({ stock_count }) {
    const { idol } = this.state
    this.setState({
      idol: {
        ...idol,
        buy_stock_count: helper.calculate(+idol.buy_stock_count + stock_count),
        market_price: helper.calculate(+idol.market_price + stock_count)
      }
    })
  }

  componentDidMount () {
    this.getIdolData()
    this.getIdolFans()
    this.setState({
      showEdit: helper.hasRole('update_bangumi')
    })
  }

  render () {
    const { idol, fans_data, showEdit, collapsedHeader } = this.state
    const avatar = fans_data.map(user => (
      <Image
        className='avatar'
        src={helper.resize(user.avatar, { width: 70 })}
        key={user.slug}
        taroKey={user.slug}
        mode='aspectFit'
      />
    ))
    return (
      <View className='idol-show'>
        <IdolPanel idol={idol} collapsed={collapsedHeader} />
        <View className='intro'>
          <Text className='intro__title'>{idol.bangumi.name} {idol.name}</Text>
        </View>
        <View className='social-panel intro'>
          <Navigator hover-class='none' url={`/pages/webview/index?url=${encodeURIComponent('user/list?type=idol_fans&slug=' + idol.slug)}`} className='avatar-list'>
            {avatar}
          </Navigator>
          <View className='controls'>
            {
              showEdit ? <Navigator hover-class='none' url={`/pages/webview/index?url=${encodeURIComponent('idol/edit?slug=' + idol.slug)}`}>
                <AtIcon className='pink-icon' value='settings' size='15' color='#fff' />
              </Navigator> : ''
            }
          </View>
        </View>
        {
          idol.intro ?
            <View className='intro'>
              <Text className='intro__title'>角色简介</Text>
              <Text className='intro__text'>{idol.intro}</Text>
            </View> : ''
        }
        <View className='intro'>
          <Text className='intro__title'>所属番剧</Text>
          <BangumiRankItem bangumi={idol.bangumi} />
        </View>
        <IdolBottom idol={idol} onPayCallback={this.handleBuyStock.bind(this)} />
      </View>
    )
  }
}
