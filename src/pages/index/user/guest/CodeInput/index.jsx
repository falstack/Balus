import Taro, { Component } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import './index.scss'

class CodeInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      count: 0
    }
  }

  handleInput(evt) {
    const { value } = evt.detail
    this.props.onInput(value)
    this.setState({ value })
  }

  render() {
    const { count, value } = this.state
    const list = new Array(this.props.length)
    const result = list.map((_, index) => (
      <View
        key={index}
        className={`item ${count === index ? 'is-active' : ''}`}
      >
        {value[index]}
      </View>
    ))

    return (
      <View class="code-input">
        <Input
          value={value}
          class="input"
          type="number"
          auto-focus="true"
          confirm-type="send"
          adjustPosition=""
          maxlength={this.props.length}
          disabled={this.state.disabled}
          style={`padding-left:${36 * count + 18}px`}
          onInput={this.handleInput}
        />
        <View class="code-input__wrap">
          {result}
        </View>
      </View>
    )
  }
}

CodeInput.defaultProps = {
  length: 6,
  onInput: () => {}
}

export default CodeInput
