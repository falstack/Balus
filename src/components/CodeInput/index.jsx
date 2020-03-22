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
      disabled: false,
      count: 0
    }
  }

  handleInput(evt) {
    if (this.state.loading) {
      return
    }
    const { value } = evt.detail
    const count = value.length
    const matched = count === this.props.length
    if (!matched) {
      this.setState({
        value,
        count
      })
      return
    }
    this.setState({
      value,
      count,
      disabled: true
    })
    setTimeout(() => {
      if (this.state.loading) {
        return
      }
      this.setState({
        loading: true
      })
      this.props.onConfirm(value)
        .then(() => {})
        .catch(() => {
          this.setState({
            value: '',
            count: 0,
            loading: false,
            disabled: false
          })
        })
    }, 1000)
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
            disabled={this.state.disabled}
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
