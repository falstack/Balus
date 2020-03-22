import Taro, { Component } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import utils from '~/utils'
import './index.scss'

class CodeInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      loading: false,
      count: 0
    }
  }

  handleInput(evt) {
    const { value } = evt.detail
    const count = value.length
    const loading = count === this.props.length
    this.setState({
      value,
      count,
      loading
    })
    if (loading) {
      setTimeout(() => {
        this.props.onConfirm(value)
          .then(() => {})
          .catch(() => {
            this.setState({
              value: '',
              count: 0,
              loading: false
            })
          })
      }, 1000)
    }
  }

  render () {
    const { length } = this.props
    const { count, value } = this.state
    const list = new Array(length)
    const result = list.map((_, index) => (
      <View
        key={index}
        className={`item ${count === index ? 'is-active' : ''}`}
      >
        {value[index]}
      </View>
    ))

    return (
      <View className='code-input'>
        <View className='title'>短信已发送至：+86 {utils.maskTel(this.props.phone)}</View>
        <View className='core'>
          <Input
            focus
            type='number'
            disabled={this.state.loading}
            value={value}
            maxLength={length}
            style={`padding-left:${36 * count + 18}px`}
            onInput={this.handleInput}
          />
          <View className='wrap'>
            {result}
          </View>
        </View>
      </View>
    )
  }
}

CodeInput.defaultProps = {
  phone: '',
  length: 6,
  onConfirm: () => {}
}

export default CodeInput
