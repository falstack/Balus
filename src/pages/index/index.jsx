import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import toast from '~/utils/toast'
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick() {
    toast.info('hello')
  }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <AtButton type='primary' onClick={this.handleClick}>Hello Taro-UI</AtButton>
      </View>
    )
  }
}
