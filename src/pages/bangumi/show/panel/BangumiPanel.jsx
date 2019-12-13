import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Navigator } from '@tarojs/components'
import helper from '~/utils/helper'
import PageNav from '~/components/PageNav/index'
import './index.scss'

export default class BangumiPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { bangumi } = this.props
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
              <Navigator url={`/pages/webview/index?url=${encodeURIComponent('app/bangumi/join?slug=' + bangumi.slug)}`} className='join-btn'>加入圈子</Navigator>
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
