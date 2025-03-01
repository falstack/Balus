import cache from '~/utils/cache'
import event from '~/utils/event'

export default {
  dispatch(data) {
    cache.set(`SOCKET_MSG_${data.channel}`, data, false)
    event.emit(`socket-${data.channel}`, data)
    if (data.channel === 'unread_total') {
      this._setTabBadge(data, 2)
    }
  },

  _setTabBadge(data, index) {
    let total = 0
    delete data.channel
    Object.keys(data).forEach(key => {
      if (key !== 'unread_follow_count') {
        total += data[key]
      }
    })
    cache.set(`TAB_BAR_${index}_COUNT`, total)
    event.emit(`TAB_BAR_${index}_CHANGE`)
  }
}
