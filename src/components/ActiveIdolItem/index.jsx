import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

export default class ActiveIdolItem extends Component {
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
    const { idol } = this.props
    return (
      <View className='active-idol__wrap'>
        <View className='active-idol'>
          <View className='active-idol__avatar__wrap'>
            <Image className='active-idol__avatar' src={idol.avatar} mode='aspectFit'></Image>
          </View>
          <Text>{idol.name}</Text>
        </View>
      </View>
    )
  }
}

ActiveIdolItem.defaultProps = {
  idol: {
    bangumi: {},
    lover: {}
  },
}
