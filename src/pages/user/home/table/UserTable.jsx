import Taro, { Component } from '@tarojs/taro'
import { View, Button, Navigator } from '@tarojs/components'
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
          {/*
          <Navigator hover-class='none' url={`/pages/webview/index?url=${encodeURIComponent('https://www.calibur.tv')}`}>
            <AtListItem
              title='交易记录'
              arrow='right'
              hasBorder={false}
              iconInfo={{
                size: 20,
                color: '#657786',
                value: 'shopping-bag'
              }}
            />
          </Navigator>
          <AtListItem
            title='我的邀请码'
            arrow='right'
            hasBorder={false}
            extraText='邀请送团子'
            iconInfo={{
              size: 20,
              color: '#657786',
              value: 'sketch'
            }}
          />
          <AtListItem
            title='帮助手册'
            arrow='right'
            hasBorder={false}
            iconInfo={{
              size: 20,
              color: '#657786',
              value: 'help'
            }}
          />
          */}
          <Button open-type='feedback' class='feedback' hover-class='none'>
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
          </Button>
        </AtList>
      </View>
    )
  }
}

UserTable.defaultProps = {
  user: {}
}
