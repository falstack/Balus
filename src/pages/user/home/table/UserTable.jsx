import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import './index.scss'

export default class UserTable extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='user-panel'>
        <AtList hasBorder={false}>
          <button open-type='feedback' class='feedback' hover-class='none'>
            <AtListItem
              title='意见反馈'
              arrow='right'
              hasBorder={false}
              iconInfo={{
                size: 20,
                color: '#657786',
                value: 'phone'
              }}
            />
          </button>
        </AtList>
      </View>
    )
  }
}

UserTable.defaultProps = {
  user: {}
}
