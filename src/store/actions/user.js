import http from '~/utils/http'
import cache from '~/utils/cache'

import {
  SET_USER_INFO,
  DEL_USER_INFO,
  UPDATE_USER_POCKET,
  REFRESH_USER_INFO
} from '../constants/user'

export function updateUserPocket (data) {
  return {
    type: UPDATE_USER_POCKET,
    data
  }
}

export function delUserInfo () {
  return dispatch => {
    const handler = () => {
      cache.remove('JWT-TOKEN')
      dispatch({
        type: DEL_USER_INFO
      })
    }

    http.post('door/logout')
      .then(handler)
      .catch(handler)
  }
}

export function refreshUserInfo (slug) {
  return dispatch => {
    http.get('user/patch', { slug })
      .then(data => {
        dispatch({
          type: REFRESH_USER_INFO,
          data
        })
      })
      .catch(() => {})
  }
}

export function getUserInfo () {
  return dispatch => {
    http
      .post('door/get_user_info')
      .then(user => {
        if (user && user.title.length) {
          // http.get('user/roles')
          //   .then(roles => {
          //     cache.set('USER_ROLES', roles)
          //   })
          //   .catch(() => {})
        }
        dispatch({
          type: SET_USER_INFO,
          user
        })
      })
      .catch(err => {
        if (err.code === 401) {
          cache.remove('JWT-TOKEN')
        }
      })
  }
}
