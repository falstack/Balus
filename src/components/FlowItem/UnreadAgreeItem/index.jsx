import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text, Image, Block } from '@tarojs/components'
import utils from '~/utils'
import './index.scss'

class UnreadAgreeItem extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { item } = this.props
    const isPin = item.type === 'pin'
    return (
      <View className='u-a-item'>
        <View className='header'>
          <Image className='avatar' src={utils.resize(item.user.avatar, { width: 80 })} />
          <View className='info'>
            <View>
              <Text className='nickname'>{item.user.nickname}</Text>
              <Text>喜欢你的{isPin ? '文章' : '评论'}</Text>
            </View>
            <View className='meta'>
              {utils.timeAgo(item.created_at)}
            </View>
          </View>
        </View>
        <View className='body'>
          {
            isPin && item.data.banner.length
              ? <Image className='banner' src={utils.resize(item.data.banner[0], { width: 100, height: 80 })} />
              : ''
          }
          <View className='text-wrap'>
            <View className='content'>{isPin ? item.data.title.text : item.data.content[0].data.text}</View>
            <View className='meta'>
              {
                isPin ? <Block>
                  <Text className='item'>{item.data.like_count} 喜欢</Text>
                  <Text className='dot'>·</Text>
                  <Text className='item'>{item.data.comment_count} 评论</Text>
                  <Text className='dot'>·</Text>
                  <Text className='item'>{item.data.mark_count} 收藏</Text>
                </Block> : <Block>
                  <Text className='item'>{item.data.like_count} 喜欢</Text>
                </Block>
              }
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
    user: {},
    data: {}
  }
}

export default UnreadAgreeItem
