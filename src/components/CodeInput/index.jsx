import Taro, { Component } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
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
    const { length, value, count } = this.props
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
        <Input
          focus
          type='number'
          disabled={this.state.loading}
          value={this.state.value}
          maxLength={length}
          style={`padding-left:${36 * count + 18}px`}
          onInput={this.handleInput}
        />
        <View className='wrap'>
          {result}
        </View>
      </View>
    )
  }
}

CodeInput.defaultProps = {
  length: 6,
  onConfirm: () => {}
}

export default CodeInput
