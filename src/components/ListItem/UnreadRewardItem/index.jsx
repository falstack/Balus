import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import utils from '~/utils'
import './index.scss'

class UnreadRewardItem extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  clickBody() {
    const { pin } = this.props.item
    this.$preload('pin', pin)
    Taro.navigateTo({
      url: `/pages/pin/show/index?slug=${pin.slug}`,
    })
  }

  clickUser() {
    const { user } = this.props.item
    this.$preload('user', user)
    Taro.navigateTo({
      url: `/pages/user/show/index?slug=${user.slug}`,
    })
  }

  render () {
    const { item } = this.props

    return (
      <View className='u-r-item'>
        <View className='header'>
          <Image onClick={this.clickUser.bind(this)} className='avatar' src={utils.resize(item.user.avatar, { width: 80 })} />
          <View className='info'>
            <View className='name-wrap'>
              <Text className='nickname' onClick={this.clickUser.bind(this)}>{item.user.nickname}</Text>
              <Text>投食了你的文章</Text>
            </View>
            <View className='meta'>
              {utils.timeAgo(item.created_at)}
            </View>
          </View>
        </View>
        <View className='body' onClick={this.clickBody.bind(this)}>
          {
            item.pin.banner.length && <Image className='banner' src={utils.resize(item.pin.banner[0], { width: 100, height: 80 })} />
          }
          <View className='text-wrap'>
            <View className='content'>{item.pin.title.text}</View>
            <View className='meta'>
              <Text className='item'>{item.pin.like_count} 喜欢</Text>
              <Text className='dot'>·</Text>
              <Text className='item'>{item.pin.comment_count} 评论</Text>
              <Text className='dot'>·</Text>
              <Text className='item'>{item.pin.mark_count} 收藏</Text>
            </View>
          </View>
        </View>
        <View className='footer' />
      </View>
    )
  }
}

UnreadRewardItem.defaultProps = {
  item: {
    user: {},
    pin: {
      title: {},
      banner: []
    }
  }
}

export default UnreadRewardItem
