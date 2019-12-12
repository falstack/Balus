import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Navigator } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
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
    const showEdit = helper.hasRole('update_bangumi')
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
              <Text className='title'>{bangumi.name}</Text>
              <Text className='intro'>{bangumi.intro}</Text>
            </View>
          </View>
          {
            showEdit ? <Navigator className='edit-btn ' hover-class='none' url={`/pages/webview/index?url=${encodeURIComponent('app/bangumi/edit?slug=' + bangumi.slug)}`}>
              <AtIcon value='settings' size='15' color='#fff' />
            </Navigator> : ''
          }
        </View>
      </View>
    )
  }
}

BangumiPanel.defaultProps = {
  bangumi: {}
}
