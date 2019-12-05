import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtInputNumber } from "taro-ui"
import http from '~/utils/http'
import helper from '~/utils/helper'
import cache from '~/utils/cache'
import toast from '~/utils/toast'
import state from '~/utils/state'
import './index.scss'

export default class IdolBottom extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      submitting: false,
      value: 0,
      user: cache.get('USER', null)
    }
  }

  handleClick() {
    const { user } = this.state
    if (!user) {
      toast.info('请先登录')
      return
    }
    if (!+user.wallet_coin) {
      toast.info('木有团子啊')
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
    const { value, user } = this.state
    if (!value) {
      this.setState({
        isOpen: false
      })
      return
    }
    this.setState({
      submitting: true
    })
    const { idol } = this.props
    const amount = +helper.calculate(value * idol.stock_price)
    http.post('idol/vote', {
      slug: idol.slug,
      coin_amount: amount,
      stock_count: value
    })
      .then(() => {
        state.updateUserPocket(-amount)
        this.setState({
          user: {
            ...user,
            wallet_coin: +user.wallet_coin - amount
          },
          isOpen: false
        })
        this.props.onPayCallback({
          stock_count: value,
          coin_amount: amount
        })
      })
      .catch(err => {
        toast.info(err.message)
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
          <Text className='idol-bottom__price'>{idol.stock_price}个团子/票</Text>
          <Button className='idol-bottom__btn idol-bottom__buy' onClick={this.handleClick.bind(this)}>
            立即投票
          </Button>
        </View>
        <View className='idol-bottom__shim' />
        <AtModal
          isOpened={isOpen}
          onClose={this.handleClose.bind(this)}
        >
          <AtModalHeader>投票窗口</AtModalHeader>
          <AtModalContent>
            <View className='idol-bottom__dialog'>
              <View className='idol-bottom__text'>
                剩余团子：{user.wallet_coin}
              </View>
              <View className='idol-bottom__text'>
                购入份额：
                <AtInputNumber
                  min={0}
                  max={parseInt(user ? user.wallet_coin : 0 / idol.stock_price)}
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
  idol: {},
  onPayCallback: () => {}
}
