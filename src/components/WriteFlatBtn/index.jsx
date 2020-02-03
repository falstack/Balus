import Taro, { Component } from '@tarojs/taro'
import { Navigator } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <Navigator
        hover-class='none'
        className='write-flat-btn'
        url={`/pages/webview/index?url=${encodeURIComponent('write/pin')}`}
      >
        <AtIcon value='edit' color='#fff' />
      </Navigator>
    )
  }
}
