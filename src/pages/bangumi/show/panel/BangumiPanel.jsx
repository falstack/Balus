import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Navigator, Button } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import helper from '~/utils/helper'
import cache from '~/utils/cache'
import toast from '~/utils/toast'
import http from '~/utils/http'
import PageNav from '~/components/PageNav/index'
import './index.scss'

export default class BangumiPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: cache.get('USER', null),
      liker_list: [],
      liker_total: 0
    }
  }

  showLogin() {
    toast.info('请先登录')
  }

  componentDidMount() {
    this.getBangumiLiker()
  }

  getBangumiLiker() {
    http.get('bangumi/liker', {
      slug: this.props.slug
    })
      .then(data => {
        this.setState({
          liker_list: data.result,
          liker_total: data.total
        })
      })
      .catch(() => {})
  }

  render() {
    const { bangumi } = this.props
    const { user, liker_list, liker_total } = this.state
    const like_users = liker_list.slice(0, 5).map(item => (
      <Image
        className='avatar'
        src={helper.resize(item.avatar, { width: 140 })}
        key={item.slug}
        taroKey={item.slug}
        mode='aspectFit'
      />
    ))
    return (
      <View className='bangumi-panel'>
        <View className='background'>
          <Image
            src={helper.resize(bangumi.avatar, {
              height: 200,
              mode: 2
            })}
            mode='aspectFill'
            className='blur-bg'
          />
          <View className='shim' />
          <PageNav />
          <View className='background-content'>
            <Image
              src={helper.resize(bangumi.avatar, { width: 200 })}
              mode='aspectFill'
              className='avatar'
            />
            <View className='body'>
              <Navigator hover-class='none' url={`/pages/webview/index?url=${encodeURIComponent('app/bangumi/edit?slug=' + bangumi.slug)}`}>
                {
                  bangumi.rank !== '0' ? <Text className='rank'>动漫排行榜 NO.{bangumi.rank}</Text> : ''
                }
                {
                  Number(bangumi.score) ?
                    <View className='score'>
                      <Text className='score__number'>{bangumi.score}</Text>
                      <Text className='score__fen'>分</Text>
                    </View> : ''
                }
                <Text className='title'>{bangumi.name}</Text>
                <Text className='intro'>{bangumi.intro}</Text>
              </Navigator>
              {
                user
                  ? bangumi.is_liked
                    ? <Button className='join-btn-empty'>已加入</Button>
                    : <Navigator url={`/pages/webview/index?url=${encodeURIComponent('app/bangumi/join?slug=' + bangumi.slug)}`} className='join-btn'>加入圈子</Navigator>
                  : <Button className='join-btn' onClick={this.showLogin.bind(this)}>加入圈子</Button>
              }
            </View>
          </View>
          {
            liker_total ? <Navigator
              hover-class='none'
              className='panel-wrap avatar-panel'
              url={`/pages/webview/index?url=${encodeURIComponent('app/user/list?type=bangumi_liker&slug=' + bangumi.slug)}`}
            >
              <View>
                {like_users}
                <Text className='avatar-tail text'>等 {liker_total} 个看过的人</Text>
              </View>
              <AtIcon size='16' color='#FFF' value='chevron-right' />
            </Navigator> : ''
          }
        </View>
      </View>
    )
  }
}

BangumiPanel.defaultProps = {
  bangumi: {},
  slug: ''
}
