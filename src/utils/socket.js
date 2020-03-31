import cache from '~/utils/cache'
import event from '~/utils/event'

export default {
  dispatch(data) {
    console.log('dispatch', data)
    if (data.channel === 'unread_total') {
      this._setTabBadge(data.unread_message_total + data.unread_notice_total, 2)
    } else {
      this._dispatchData(data)
    }
    cache.set(`SOCKET_MSG_${data.channel}`, data, false)
  },

  _dispatchData(data) {
    event.emit(`socket-${data.channel}`, data)
  },

  _setTabBadge(total, index) {
    cache.set(`TAB_BAR_${index}_COUNT`, total)
    event.emit(`TAB_BAR_${index}_CHANGE`)
  }
}
