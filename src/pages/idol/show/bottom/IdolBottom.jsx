import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Input } from '@tarojs/components'
import { inject, observer } from '@tarojs/mobx'
import utils from '~/utils'
import http from '~/utils/http'
import toast from '~/utils/toast'
import Dialog from '~/components/Dialog'
import './index.scss'

@inject('user')
@observer
export default class IdolBottom extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      submitting: false,
      value: 0,
    }
  }

  handleClick() {
    if (this.props.user.isGuest) {
      toast.info('请先登录')
      return
    }
    if (!+this.props.user.info.wallet_coin) {
      toast.info('木有团子啊')
      return
    }
    this.setState({
      isOpen: true
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
    const { value } = this.state
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
    const amount = +utils.calculate(value * idol.stock_price)
    http.post('idol/vote', {
      slug: idol.slug,
      coin_amount: amount,
      stock_count: value
    })
      .then(() => {
        this.props.user.updateUserPocket(-amount)
        this.setState({
          isOpen: false,
          submitting: false,
          value: 0
        })
        this.props.onPayCallback({
          stock_count: value,
          coin_amount: amount
        })
        toast.info('入股成功')
      })
      .catch(err => {
        toast.info(err.message)
        this.setState({
          submitting: false
        })
      })
  }

  handleInput (evt) {
    let value = evt.detail.value
    if (value < 0) {
      value = 0
    }
    if (this.props.user.isGuest) {
      value = 0
    }
    const max = parseInt(this.props.user.info.wallet_coin / this.props.idol.stock_price)
    if (value > max) {
      value = max
    }
    value = +value
    this.setState({
      value
    })
  }

  render () {
    const { idol, user: { info: { wallet_coin } } } = this.props

    return (
      <View className='idol-bottom'>
        <View className='idol-bottom__content'>
          <Text className='idol-bottom__price'>{idol.stock_price}个团子/票</Text>
          <Button className='idol-bottom__btn idol-bottom__buy' onClick={this.handleClick}>
            立即投票
          </Button>
        </View>
        <View className='idol-bottom__shim' />
        <Dialog visible={this.state.isOpen} onClose={() => { this.setState({ isOpen: false }) }}>
          <View className='dialog__wrap'>
            <View className='dialog__header'>投票窗口</View>
            <View className='dialog__body'>
              <View className='dialog__line'>
                <View className='label'>剩余团子：</View>
                <View>{wallet_coin}个</View>
              </View>
              <View className='dialog__line'>
                <View className='label'>最多买入：</View>
                <View>{parseInt(wallet_coin / idol.stock_price)}股</View>
              </View>
              <View className='dialog__line'>
                <View className='label'>购入股数：</View>
                <Input
                  type='number'
                  adjustPosition
                  onInput={this.handleInput}
                />
              </View>
            </View>
            <View className='dialog__footer'>
              <Button hover-class='none' onClick={this.handleCancel}>取消</Button>
              <Button hover-class='none' onClick={this.handleConfirm}>确定</Button>
            </View>
          </View>
        </Dialog>
      </View>
    )
  }
}

IdolBottom.defaultProps = {
  idol: {},
  onPayCallback: () => {}
}
