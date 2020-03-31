import Taro from '@tarojs/taro'
import cache from '~/utils/cache'
import event from '~/utils/event'

export default {
  dispatch(data) {
    console.log('dispatch', data)
    if (data.channel === 'unread_total') {
      this._setTabBadge(data.unread_message_total + data.unread_notice_total)
    } else {
      this._dispatchData(data)
    }
    cache.set(`SOCKET_MSG_${data.channel}`, data, false)
  },

  _dispatchData(data) {
    event.emit(`socket-${data.channel}`, data)
  },

  _setTabBadge(total) {
    if (total) {
      Taro.setTabBarBadge({
        index: 2,
        text: total.toString()
      })
    } else {
      Taro.removeTabBarBadge({
        index: 2
      })
    }
  }
}
