import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Navbar from '~/components/Navbar/bg'
import utils from '~/utils'
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
        <Navbar blur background={idol.avatar} title={idol.name}>
          <View className='content'>
            <Image
              src={utils.resize(idol.avatar, { width: 170 })}
              mode='aspectFill'
              className='avatar'
            />
          </View>
        </Navbar>
        <View className='footer'>
          {
            idol.buy_stock_count ?
              <View className='mine'>
                <View>投入份额</View>
                <View>{idol.buy_stock_count}股</View>
              </View>
              : ''
          }
          <View className='price'>
            当前总分 {utils.calculate(idol.market_price)}
          </View>
        </View>
      </View>
    )
  }
}

IdolPanel.defaultProps = {
  collapsed: false,
  idol: {}
}
