import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import helper from '~/utils/helper'
import PageNav from '~/components/PageNav/index'
import './index.scss'

export default class BangumiPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { bangumi } = this.props
    return (
      <View className='bangumi-panel'>
        <View className='background'>
          <Image
            src={helper.resize(bangumi.avatar, {
              height: 200,
              mode: 2
            })}
            mode='aspectFill'
            className='blur-bg'
          />
          <View className='shim' />
          <PageNav title={bangumi.name} />
          <View className='background-content'>
            <Image
              src={helper.resize(bangumi.avatar, { width: 200 })}
              mode='aspectFill'
              className='avatar'
            />
          </View>
        </View>
      </View>
    )
  }
}

BangumiPanel.defaultProps = {
  bangumi: {}
}
