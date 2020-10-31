import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import utils from '~/utils'
import http from '~/utils/http'
import toast from '~/utils/toast'
import classNames from 'classnames'
import { updateUserPocket } from '~/store/actions/user'
import './index.scss'

@connect(store => ({
  user: store.user.info
}), (dispatch) => ({
  updateUserPocket (val) {
    dispatch(updateUserPocket(val))
  }
}))
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
    const { user } = this.props
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
        this.props.updateUserPocket(-amount)
        this.setState({
          isOpen: false
        })
        this.props.onPayCallback({
          stock_count: value,
          coin_amount: amount
        })
        toast.info('入股成功')
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

  handleInput (evt) {
    let value = evt.detail.value
    if (value < 0) {
      value = 0
    }
    if (!this.props.user) {
      value = 0
    }
    const max = parseInt(this.props.user.wallet_coin / this.props.idol.stock_price)
    if (value > max) {
      value = max
    }
    this.setState({
      value
    })
  }

  render () {
    const { idol, user } = this.props
    const { isOpen } = this.state
    return (
      <View className='idol-bottom'>
        <View className='idol-bottom__content'>
          <Text className='idol-bottom__price'>{idol.stock_price}个团子/票</Text>
          <Button className='idol-bottom__btn idol-bottom__buy' onClick={this.handleClick}>
            立即投票
          </Button>
        </View>
        <View className='idol-bottom__shim' />
        <View className={classNames('dialog', { 'is-open': isOpen })}>
          <View className='dialog__mask' onClick={() => { this.setState({ isOpen: false }) }} />
          <View className='dialog__wrap'>
            <View className='dialog__header'>投票窗口</View>
            <View className='dialog__body'>
              <View className='dialog__line'>
                <View className='label'>剩余团子：</View>
                <View>{user.wallet_coin}</View>
              </View>
              <View className='dialog__line'>
                <View className='label'>购入份额：</View>
                <Input
                  value={this.state.value}
                  type='number'
                  onInput={this.handleInput}
                />
              </View>
            </View>
            <View className='dialog__footer'>
              <Button hover-class='none' onClick={this.handleCancel}>取消</Button>
              <Button hover-class='none' onClick={this.handleConfirm}>确定</Button>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

IdolBottom.defaultProps = {
  idol: {},
  onPayCallback: () => {}
}
