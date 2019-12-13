import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Navigator, Button } from '@tarojs/components'
import helper from '~/utils/helper'
import cache from '~/utils/cache'
import toast from '~/utils/toast'
import PageNav from '~/components/PageNav/index'
import './index.scss'

export default class BangumiPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: cache.get('USER', null)
    }
  }

  showLogin() {
    toast.info('请先登录')
  }

  render() {
    const { bangumi } = this.props
    const { user } = this.state
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
                  ? <Navigator url={`/pages/webview/index?url=${encodeURIComponent('app/bangumi/join?slug=' + bangumi.slug)}`} className='join-btn'>加入圈子</Navigator>
                  : <Button className='join-btn' onClick={this.showLogin.bind(this)}>加入圈子</Button>
              }
            </View>
          </View>
        </View>
      </View>
    )
  }
}

BangumiPanel.defaultProps = {
  bangumi: {}
}
