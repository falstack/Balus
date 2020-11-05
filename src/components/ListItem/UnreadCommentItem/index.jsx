import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text, Image, Block } from '@tarojs/components'
import utils from '~/utils'
import './index.scss'

class UnreadAgreeItem extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  clickBody() {
    const { data } = this.props.item
    Taro.navigateTo({
      url: `/pages/pin/show/index?slug=${data.pin_slug}`,
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
    const isPin = !item.comment.getter
    return (
      <View className='u-c-item'>
        <View className='header'>
          <Image onClick={this.clickUser.bind(this)} className='avatar' src={utils.resize(item.comment.author.avatar, { width: 80 })} />
          <View className='info'>
            <View className='name-wrap'>
              <Text className='nickname' onClick={this.clickUser.bind(this)}>{item.comment.author.nickname}</Text>
              <Text>回复了你的{isPin ? '文章' : '评论'}</Text>
            </View>
            <View className='meta'>
              {utils.timeAgo(item.comment.created_at)}
            </View>
          </View>
        </View>
        <View className='body' onClick={this.clickBody.bind(this)}>
          <View className='text-wrap'>
            <View className='content'>{item.comment.content[0].data.text}</View>
            <View className='meta'>
              <Text className='item'>{item.comment.like_count} 喜欢</Text>
            </View>
          </View>
        </View>
        <View className='footer' />
      </View>
    )
  }
}

UnreadAgreeItem.defaultProps = {
  item: {
    comment: {
      author: {}
    },
    pin: {
      banner: []
    }
  }
}

export default UnreadAgreeItem
