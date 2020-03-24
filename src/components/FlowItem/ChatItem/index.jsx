import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import classNames from 'classnames'
import utils from '~/utils'
import './index.scss'

class ChatItem extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  userClick() {
    const { user } = this.props.item
    this.$preload('user', user)
    Taro.navigateTo({
      url: `/pages/user/show/index?slug=${user.slug}`,
    })
  }

  render () {
    const { is_mine, item } = this.props

    return (
      <View className={classNames('chat-item', [is_mine ? 'is-right' : 'is-left'], `sex-${item.user.sex}`)}>
        <Image className='avatar' src={utils.resize(item.user.avatar, { width: 30 })} onClick={this.userClick} />
        <View className='content'>
          <View className='bubble'>
            {item.content[0].data.text}
          </View>
        </View>
      </View>
    )
  }
}

ChatItem.defaultProps = {
  is_mine: false,
  item: {
    user: {},
    content: []
  }
}

export default ChatItem
