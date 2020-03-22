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

  componentWillMount() {
    this.getTabsRect()
  }

  handleTabClick(value) {
    this.props.onClick(value.currentTarget.dataset.index)
  }

  getTabsRect(loop = 0) {
    const query = Taro.createSelectorQuery().in(this.$scope)
    query.selectAll('.tab-item').boundingClientRect()
    query.exec((res) => {
      if (res[0] === null || !res[0].length) {
        if (loop < 5) {
          setTimeout(() => {
            this.getTabsRect(loop + 1)
          }, 200)
        }
        return
      }
      this.setState({
        tabRect: res[0].map(_ => {
          return {
            left: _.left,
            width: _.width
          }
        })
      })
    })
  }

  render () {
    const { list, active, line, pink } = this.props
    const { tabRect } = this.state
    return (
      <ScrollView
        scrollLeft={tabRect && active ? tabRect[active - 1].left : 0}
        className={classNames('tab-header', `tab-header--${list.length}`, { 'tab-header--line': line }, { 'tab-header--pink': pink })}
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
          <View className='tab-anchor' style={`width:${tabRect ? tabRect[active].width - 32 : 0}px;transform:translateX(${tabRect ? tabRect[active].left + 16 : 0}px);`} />
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
  onClick: () => {}
}

export default TabHeader
