import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Navigator } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import utils from '~/utils'
import './index.scss'

export default class FlowPinItem extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { item, params } = this.props
    const state = {
      showUser: true,
      showBangumi: true,
      showTime: false,
      ...params
    }
    return (
      <View className='flow-pin-item'>
        {
          state.showUser ? (
            <View className='header'>
              <Navigator className='user' hover-class='none' url={`/pages/user/show/index?slug=${item.author.slug}`}>
                <Image lazyLoad className='avatar' src={utils.resize(item.author.avatar, { width: 50 })} />
                <Text>{ item.author.nickname }</Text>
              </Navigator>
              {
                state.showTime ? (
                  <Text className='time'>{ utils.timeAgo(item.published_at) }</Text>
                ) : ''
              }
            </View>
          ) : ''
        }
        <Navigator className='body' hover-class='none' url={`/pages/pin/show/index?slug=${item.slug}`}>
          <View className='title'>{ item.title.text }</View>
          {
            item.banner.length === 3 ? (
              <View className='banner banner-3'>
                <View className='image-wrap-2'>
                  <Image lazyLoad src={utils.resize(item.banner[0], { width: 250 })} />
                </View>
                <View className='image-wrap-1'>
                  <View className='image-box'>
                    <Image lazyLoad src={utils.resize(item.banner[1], { width: 125 })} />
                  </View>
                  <View className='image-box'>
                    <Image lazyLoad src={utils.resize(item.banner[2], { width: 125 })} />
                  </View>
                </View>
              </View>
            ) : (
              <View className={`banner banner-${item.banner.length}`}>
                {item.banner.map(image =>(
                  <View key={image} taroKey={image} className='image-box'>
                    <Image lazyLoad src={utils.resize(image, item.banner.length === 2 ? { width: 200 } : { width: 380, height: 190 })} />
                  </View>
                ))}
              </View>
            )
          }
          {
            item.intro ? (
              <View className='intro'>{item.intro}</View>
            ) : ''
          }
        </Navigator>
        <View className='footer'>
          <View className='state'>
            <View className='state-item'>
              <AtIcon value='message' size='15' />
              <Text className='text'>{ item.comment_count || '评论' }</Text>
            </View>
            <View className='state-item'>
              <AtIcon value='heart' size='15' />
              <Text className='text'>{ item.like_count || '点赞' }</Text>
            </View>
          </View>
          {
            state.showBangumi ? (
              <Navigator className='bangumi' hover-class='none' url={`/pages/bangumi/show/index?slug=${item.bangumi.slug}`}>{item.bangumi.name}</Navigator>
            ) : ''
          }
        </View>
      </View>
    )
  }
}

FlowPinItem.defaultProps = {
  item: {
    title: {},
    author: {},
    bangumi: {},
    banner: []
  },
  params: {}
}
