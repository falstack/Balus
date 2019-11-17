import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtAvatar, AtButton, AtNavBar } from 'taro-ui'
import helper from '~/utils/helper'
import './index.scss'

export default class IdolPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { idol } = this.props
    return (
      <View className='idol-panel'>
        <View className='background'>
          <Image
            src={helper.resize(idol.avatar, {
              height: 200,
              mode: 2
            })}
            mode='aspectFill'
            className='blur-bg'
          />
          <View className='shim' />
          <AtNavBar
            color='#fff'
            leftIconType='chevron-left'
            leftText={idol.name}
            border={false}
            onClickLeftIcon={() => {
              Taro.navigateBack()
            }}
          />
          <View className='background-content'>
            <Image
              src={helper.resize(idol.avatar, { width: 200 })}
              mode='aspectFill'
              className='avatar'
            />
          </View>
        </View>
      </View>
    )
  }
}

IdolPanel.defaultProps = {
  idol: {}
}
