import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtInputNumber } from "taro-ui"
import http from '~/utils/http'
import helper from '~/utils/helper'
import cache from '~/utils/cache'
import toast from '~/utils/toast'
import './index.scss'

export default class IdolBottom extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      submitting: false,
      value: 1,
      user: cache.get('USER', null)
    }
  }

  handleClick() {
    if (!this.state.user) {
      toast.info('请先登录')
      return
    }
    this.setState({
      isOpen: true
    })
  }

  handleClose() {
    this.setState({
      isOpen: false
    })
  }

  handleCancel() {
    this.setState({
      isOpen: false
    })
  }

  handleConfirm() {
    if (this.state.submitting) {
      return
    }
    this.setState({
      submitting: true
    })
    const { idol } = this.props
    const { value } = this.state
    http.post('idol/vote', {
      slug: idol.slug,
      coin_amount: helper.calculate(value * idol.stock_price),
      stock_count: value
    })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        this.setState({
          submitting: false
        })
      })
  }

  handleChange (value) {
    this.setState({
      value
    })
  }

  render () {
    const { idol } = this.props
    const { isOpen, user } = this.state
    return (
      <View className='idol-bottom'>
        <View className='idol-bottom__content'>
          <Text className='idol-bottom__price'>￥{idol.stock_price}/股</Text>
          <Button className='idol-bottom__btn idol-bottom__buy' onClick={this.handleClick.bind(this)}>
            立即入股
          </Button>
        </View>
        <View className='idol-bottom__shim' />
        <AtModal
          isOpened={isOpen}
          onClose={this.handleClose.bind(this)}
        >
          <AtModalHeader>交易窗口</AtModalHeader>
          <AtModalContent>
            <View className='idol-bottom__dialog'>
              <View className='idol-bottom__text'>
                团子余额：￥{user.wallet_coin}
              </View>
              <View className='idol-bottom__text'>
                入股金额：
                <AtInputNumber
                  min={1}
                  max={user.wallet_coin}
                  step={1}
                  value={this.state.value}
                  onChange={this.handleChange.bind(this)}
                />
              </View>
            </View>
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.handleCancel.bind(this)}>取消</Button>
            <Button onClick={this.handleConfirm.bind(this)}>确定</Button>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}

IdolBottom.defaultProps = {
  idol: {}
}
