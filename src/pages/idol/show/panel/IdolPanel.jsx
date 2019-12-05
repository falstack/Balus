import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import helper from '~/utils/helper'
import PageNav from '~/components/PageNav/index'
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
          <PageNav title={idol.name} />
          <View className='background-content'>
            <Image
              src={helper.resize(idol.avatar, { width: 200 })}
              mode='aspectFill'
              className='avatar'
            />
          </View>
        </View>
        <View className='idol-panel__footer'>
          {
            idol.buy_stock_count ?
              <View className='idol-panel__mine'>
                <View>投入份额</View>
                <View>{idol.buy_stock_count}票</View>
              </View>
              : ''
          }
          <View className='idol-panel__price'>
            当前票数 {helper.calculate(idol.market_price)}
          </View>
        </View>
      </View>
    )
  }
}

IdolPanel.defaultProps = {
  idol: {}
}
