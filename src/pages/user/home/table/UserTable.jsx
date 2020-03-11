import Taro, { Component } from '@tarojs/taro'
import { View, Button, Navigator } from '@tarojs/components'
import './index.scss'

export default class UserTable extends Component {
  constructor(props) {
    super(props)
  }

  static options = {
    addGlobalClass: true
  }

  render() {
    const { user } = this.props
    return (
      <View className='user-table'>
        {
          user.is_admin ? <Navigator className='table-item' hover-class='none' url={`/pages/webview/index?url=${encodeURIComponent('admin')}`}>
            <Text>控制台</Text>
            <Text className='iconfont ic-right' />
          </Navigator> : ''
        }
        <Button open-type='feedback' class='table-item' hover-class='none'>
          <Text>意见反馈</Text>
          <Text className='iconfont ic-right' />
        </Button>
      </View>
    )
  }
}

UserTable.defaultProps = {
  user: {}
}
