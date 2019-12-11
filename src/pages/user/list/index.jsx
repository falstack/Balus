import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Navigator } from '@tarojs/components'
import { AtLoadMore } from 'taro-ui'
import http from '~/utils/http'
import helper from '~/utils/helper'
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

  componentDidMount () {
    this.getUsers()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  getUsers() {
    const { slug, type, list_state } = this.state
    if (list_state.loading || list_state.noMore) {
      return
    }
    let url
    if (type === 'idol_fans') {
      url = 'idol/fans'
    }
    http.get(url, {
      slug,
      page: list_state.page
    })
      .then(data => {
        const { list_data } = this.state
        this.setState({
          list_state: {
            ...list_state,
            page: list_state.page + 1,
            loading: false,
            noMore: data.no_more,
            total: data.total
          },
          list_data: list_data.concat(data.result)
        })
      })
      .catch(() => {
        this.setState({
          list_state: {
            ...list_state,
            loading: false
          },
        })
      })
  }

  onReachBottom() {
    this.getUsers()
  }

  render () {
    const { list_data, list_state } = this.state
    const list = list_data.map(user => (
      <Navigator className='user-item' hover-class='none' url={`/pages/user/show/index?slug=${user.slug}`} key={user.slug} taroKey={user.slug}>
        <Image
          src={helper.resize(user.avatar, {
            height: 150,
            mode: 2
          })}
          mode='aspectFill'
          className='avatar'
        />
        <View className='body'>
          <Text className='nickname'>{user.nickname}</Text>
          <Text className='intro'>{user.signature}</Text>
        </View>
      </Navigator>
    ))
    return (
      <View>
        <View className='user-list'>
          {list}
        </View>
        <AtLoadMore
          status={
            list_state.loading
              ? 'loading'
              : list_state.noMore
              ? 'noMore'
              : 'more'
          }
        />
      </View>
    )
  }
}
