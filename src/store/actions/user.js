import http from '~/utils/http'
import cache from '~/utils/cache'
import { step_6_get_user_roles } from '~/utils/login'

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
      .then(data => {
        step_6_get_user_roles()
        dispatch({
          type: SET_USER_INFO,
          user: data
        })
      })
      .catch(err => {
        if (err.code === 401) {
          cache.remove('JWT-TOKEN')
        }
      })
  }
}
