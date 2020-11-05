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
    const { sender } = this.props.item
    this.$preload('user', sender)
    Taro.navigateTo({
      url: `/pages/user/show/index?slug=${sender.slug}`,
    })
  }

  render () {
    const { is_mine, item } = this.props

    return (
      <View className={classNames('chat-item', [is_mine ? 'is-right' : 'is-left'], `sex-${item.sender.sex}`)}>
        <Image className='avatar' src={utils.resize(item.sender.avatar, { width: 36 })} onClick={this.userClick} />
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
    sender: {},
    content: []
  }
}

export default ChatItem
