import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import './index.scss'

export default class PageNav extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const data = Taro.getSystemInfoSync()
    const titleBarHeight = /ios/.test(data.system.toLowerCase()) ? 44 : 48
    const top = data.statusBarHeight + (titleBarHeight - 32) / 2 - 9

    return (
      <View style={`top: ${top}PX`} className='page-nav'>
        <AtNavBar
          color='#fff'
          leftIconType='chevron-left'
          leftText={this.props.title}
          border={false}
          onClickLeftIcon={() => {
            Taro.navigateBack()
          }}
        />
      </View>
    )
  }
}

PageNav.defaultProps = {
  title: ''
}
