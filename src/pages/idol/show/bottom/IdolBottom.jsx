import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtInputNumber } from "taro-ui"
import './index.scss'

export default class IdolBottom extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      value: 1
    }
  }

  handleClick() {
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

  }

  handleChange (value) {
    this.setState({
      value
    })
  }

  render () {
    const { idol } = this.props
    const { isOpen } = this.state
    return (
      <View className='idol-bottom'>
        <View className='idol-bottom__content'>
          <Text className='idol-bottom__price'>￥{idol.stock_price}/股</Text>
          <Button className='idol-bottom__btn idol-bottom__buy' onClick={this.handleClick.bind(this)}>立即入股</Button>
        </View>
        <View className='idol-bottom__shim' />
        <AtModal
          isOpened={isOpen}
          onClose={this.handleClose.bind(this)}
        >
          <AtModalHeader>标题</AtModalHeader>
          <AtModalContent>
            <View className='idol-bottom__dialog'>
              <AtInputNumber
                min={1}
                max={10}
                step={1}
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
              />
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
