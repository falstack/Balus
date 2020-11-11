import Taro, { PureComponent } from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'
import classNames from 'classnames'
import './index.scss'

class TabHeader extends PureComponent {
  handleTabClick(value) {
    this.props.onClick(value.currentTarget.dataset.index)
  }

  render () {
    const { list, active, line, pink, scale, height } = this.props

    return (
      <ScrollView
        className={
          classNames(
            'tab-header',
            `tab-header--${list.length}`,
            { 'tab-header--line': line },
            { 'tab-header--pink': pink },
            { 'tab-header--scale': scale },
          )
        }
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
  scale: false,
  list: [],
  active: 0,
  height: '40px',
  onClick: () => {}
}

export default TabHeader
