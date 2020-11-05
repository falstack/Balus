import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Navigator } from '@tarojs/components'
import http from '~/utils/http'
import utils from '~/utils'
import navbar from '~/mixin/navbar'
import BangumiItem from "~/components/ListItem/BangumiItem"
import IdolPanel from './panel/IdolPanel'
import IdolBottom from './bottom/IdolBottom'
import './index.scss'

@navbar
class IdolShow extends Component {
  config = {
    navigationStyle: 'custom',
    navigationBarTextStyle: 'white',
    disableScroll: false,
    onReachBottomDistance: 0
  }

  constructor (props) {
    super(props)
    this.state = {
      ...(this.state || {}),
      slug: this.$router.params.slug,
      showEdit: false,
      idol: {
        bangumi: {},
        lover: null
      },
      fans_data: []
    }
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
    const { idol } = (this.$router.preload || {})
    const handler = idol => {
      this.setState({ idol })
      this.patchIdolData(idol)
    }

    if (idol) {
      handler(idol)
      return
    }

    http.get('idol/show', { slug: this.state.slug })
      .then(handler)
      .catch(() => {})
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
        buy_stock_count: utils.calculate(+idol.buy_stock_count + stock_count),
        market_price: utils.calculate(+idol.market_price + stock_count)
      }
    })
  }

  componentWillMount() {
    this.getIdolData()
    this.getIdolFans()
    this.setState({
      showEdit: utils.hasRole('update_bangumi')
    })
  }

  render () {
    const { idol, fans_data, showEdit, rect } = this.state

    if (!idol) {
      return
    }

    const avatar = fans_data.map(user => (
      <Image
        className='avatar'
        src={utils.resize(user.avatar, { width: 70 })}
        key={user.slug}
        mode='aspectFit'
      />
    ))
    return (
      <View className='idol-show'>
        <IdolPanel idol={idol} />
        <View className='collapsed-panel' style={`height:calc(100vh - ${(rect.navbar || 0) + 40}px)`}>
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
                  编辑
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
            <BangumiItem item={idol.bangumi} />
          </View>
          <IdolBottom idol={idol} onPayCallback={this.handleBuyStock.bind(this)} />
        </View>
      </View>
    )
  }
}

export default IdolShow
