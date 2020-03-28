import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import utils from '~/utils'
import LikeImage from '~/image/like.png'
import TalkImage from '~/image/talk.png'
import ShareImage from '~/image/share.png'
import PinkIcon from '~/image/pink_@.png'
import './index.scss'

class PinItem extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  static options = {
    addGlobalClass: true
  }

  clickBangumi(bangumi) {
    this.$preload('bangumi', bangumi)
    Taro.navigateTo({
      url: `/pages/bangumi/show/index?slug=${bangumi.slug}`,
    })
  }

  clickUser(user) {
    this.$preload('user', user)
    Taro.navigateTo({
      url: `/pages/user/show/index?slug=${user.slug}`,
    })
  }

  clickPin(pin) {
    this.$preload('pin', pin)
    Taro.navigateTo({
      url: `/pages/pin/show/index?slug=${pin.slug}`,
    })
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
        <View className='header'>
          {
            state.showUser ? (
              <View className='user' onClick={() => {this.clickUser(item.author)}}>
                <Image lazyLoad className='avatar' src={utils.resize(item.author.avatar, { width: 50 })} />
                <Text className='name'>{ item.author.nickname }</Text>
              </View>
            ) : ''
          }
          {
            state.showTime ? (
              <Text className='time'>{ utils.timeAgo(item.published_at) }</Text>
            ) : ''
          }
        </View>
        <View className='body' onClick={() => this.clickPin(item)}>
          <View className='title'>{ item.title.text }</View>
          {
            item.intro ? (
              <View className='intro'>{item.intro}</View>
            ) : ''
          }
          {
            item.banner.length === 3 ? (
              <View className='banner banner-3'>
                <View className='image-wrap-2'>
                  <Image mode='aspectFill' lazyLoad src={utils.resize(item.banner[0], { width: 210, height: 120 })} />
                </View>
                <View className='image-wrap-1'>
                  <View className='image-box'>
                    <Image mode='aspectFill' lazyLoad src={utils.resize(item.banner[1], { width: 110, height: 57.5 })} />
                  </View>
                  <View className='image-box'>
                    <Image mode='aspectFill' lazyLoad src={utils.resize(item.banner[2], { width: 110, height: 57.5 })} />
                  </View>
                </View>
              </View>
            ) : (
              <View className={`banner banner-${item.banner.length}`}>
                {item.banner.map(image =>(
                  <View key={image} className='image-box'>
                    <Image mode='aspectFill' lazyLoad src={utils.resize(image, item.banner.length === 2 ? { width: 170, height: 120 } : { width: 310, height: 120 })} />
                  </View>
                ))}
              </View>
            )
          }
        </View>
        <View className='badge'>
          {
            state.showBangumi ? (
              <View
                className='bangumi'
                url={`/pages/bangumi/show/index?slug=${item.bangumi.slug}`}
                onClick={() => {this.clickBangumi(item.bangumi)}}
              >
                <Image src={PinkIcon} />
                <Text>{item.bangumi.name}</Text>
              </View>
            ) : ''
          }
        </View>
        <View className='footer'>
          <Button
            hover-class='none'
            data-type='pin'
            data-slug={item.slug}
            data-title={item.title.text}
            data-path={`/pages/pin/show/index?slug=${item.slug}`}
            data-image-url={item.banner[0]}
            openType='share'
            className='state'
          >
            <Image src={ShareImage} />
            <Text className='text'>分享</Text>
          </Button>
          <View className='state'>
            <Image src={TalkImage} />
            <Text className='text'>{ item.comment_count || '评论' }</Text>
          </View>
          <View className='state'>
            <Image src={LikeImage} />
            <Text className='text'>{ item.like_count || '点赞' }</Text>
          </View>
        </View>
      </View>
    )
  }
}

PinItem.defaultProps = {
  item: {
    title: {},
    author: {},
    bangumi: {},
    banner: []
  },
  params: {}
}

export default PinItem
