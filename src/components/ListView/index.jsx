import Taro, { PureComponent } from '@tarojs/taro'
import { ScrollView, View, Image, Block } from '@tarojs/components'
import { reactive, didMount, didUnmount, defaultProps, convertProps, scrollBottomFn, scrollTopFn } from '@flowlist/taro2-react-mobx'
import Loading from '~/image/loading.gif'
import Nothing from '~/image/page_nothing.png'
import Error from '~/image/page_error.png'
import './index.scss'

@reactive
class ListView extends PureComponent {
  componentDidMount () {
    didMount(this, {
      className: 'list-view__shim',
      scrollView: true
    })
  }

  componentWillUnmount () {
    didUnmount(this)
  }

  handleTop = () => {
    if (this.props.append) {
      scrollTopFn(this)
    }
  }

  handleBottom = () => {
    if (this.props.bottom) {
      scrollBottomFn(this)
    }
  }

  render () {
    const { showError, showNoMore, showLaunch, showNothing, state } = convertProps(this)

    return (
      <ScrollView
        className='list-view'
        scrollX={this.props.scrollX}
        scrollY={!this.props.scrollX}
        scrollAnchoring
        enhanced
        showScrollbar={false}
        enableBackToTop={this.props.enableBackToTop}
        onScrollToUpper={this.handleTop}
        onScrollToLower={this.handleBottom}
      >
        {
          showLaunch ? (
            <View className='list-view__state'>
              <Image className='list-view__img' mode='aspectFit' src={Loading} />
            </View>
          ) : showNothing ? (
            <View className='list-view__state'>
              {
                this.props.launch && <Block>
                  <Image className='list-view__img' mode='aspectFit' src={Nothing} />
                  <View className='list-view__txt'>这里什么都没有</View>
                </Block>
              }
            </View>
          ) : showError ? (
            <View className='list-view__state'>
              <Image className='list-view__img' mode='aspectFit' src={Error} />
              <View className='list-view__txt'>{ state.error.message || '网络错误' }</View>
            </View>
          ) : <Block>
            {this.props.children}
            {
              showNoMore && <View className='list-view__tip'>没有更多了</View>
            }
          </Block>
        }
        <View className='list-view__shim' />
      </ScrollView>
    )
  }
}

ListView.defaultProps = defaultProps

export default ListView
