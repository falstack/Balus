import Taro, { Component } from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'
import classNames from 'classnames'
import './index.scss'

class TabHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tabRect: null
    }
  }

  handleTabClick(value) {
    this.props.onClick(value.currentTarget.dataset.index)
  }

  render () {
    const { list, active, line, pink, height } = this.props

    return (
      <ScrollView
        scrollLeft={tabRect && active ? tabRect[active - 1].left : 0}
        className={classNames('tab-header', `tab-header--${list.length}`, { 'tab-header--line': line }, { 'tab-header--pink': pink })}
        style={`height:${height}`}
        scrollX
        scrollWithAnimation
      >
        <View className='tab-wrap'>
          {
            list.map((txt, index) => (
              <Text
                key={txt}
                data-index={index}
                onClick={this.handleTabClick}
                className={classNames('tab-item', { 'is-active': active === index })}
              >{txt}</Text>
            ))
          }
        </View>
      </ScrollView>
    )
  }
}

TabHeader.defaultProps = {
  line: false,
  pink: false,
  list: [],
  active: 0,
  height: '40PX',
  onClick: () => {}
}

export default TabHeader
