import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Navigator, Button } from '@tarojs/components'
import utils from '~/utils'
import cache from '~/utils/cache'
import toast from '~/utils/toast'
import http from '~/utils/http'
import './index.scss'

export default class BangumiHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: cache.get('USER', null),
      liker_list: [],
      liker_total: 0
    }
  }

  static options = {
    addGlobalClass: true
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

    return (
      <View className='bangumi-header'>
        <View className='content'>
          <Image
            src={utils.resize(bangumi.avatar, { width: 180 })}
            mode='aspectFill'
            className='avatar'
          />
          <Navigator className='body' hover-class='none' url={`/pages/webview/index?url=${encodeURIComponent('bangumi/edit?slug=' + bangumi.slug)}`}>
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
            <View className='title'>
              <Text className='name'>{bangumi.name}</Text>
              <Text className='iconfont ic-right'/>
            </View>
            <Text className='intro'>{bangumi.intro}</Text>
          </Navigator>
        </View>
        {
          bangumi.tags.length ? <View className='tag-wrap'>
            <View className='tag-list'>
              {
                bangumi.tags.slice(0, 3).map(item => (
                  <Text key={item.slug} className='tag-item'>{item.name}</Text>
                ))
              }
            </View>
            <View className='tag-tail'>
              <Text>{bangumi.tags.length}个相关标签</Text>
              <Text className='iconfont ic-right' />
            </View>
          </View> : ''
        }
        {
          liker_total ? <Navigator
            hover-class='none'
            className='panel-wrap'
            url={`/pages/webview/index?url=${encodeURIComponent('user/list?func=getBangumiLiker&type=page&slug=' + bangumi.slug)}`}
          >
            <View>
              {
                liker_list.slice(0, 5).map(item => (
                  <Image
                    className='avatar'
                    src={utils.resize(item.avatar, { width: 140 })}
                    key={item.slug}
                    mode='aspectFit'
                  />
                ))
              }
              <Text className='avatar-tail text'>等 {liker_total} 个看过的人</Text>
            </View>
            <Text className='iconfont ic-right'/>
          </Navigator> : ''
        }
        {
          user
            ? bangumi.is_liked
            ? ''
            : <Navigator url={`/pages/webview/index?url=${encodeURIComponent('bangumi/join?slug=' + bangumi.slug)}`} className='join-btn'>加入圈子</Navigator>
            : <Button className='join-btn' onClick={this.showLogin}>加入圈子</Button>
        }
      </View>
    )
  }
}

BangumiHeader.defaultProps = {
  bangumi: {},
  slug: ''
}
