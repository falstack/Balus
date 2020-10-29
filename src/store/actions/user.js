import http from '~/utils/http'
import { step_6_get_user_roles } from '~/utils/login'

import {
  SET_USER_INFO
} from '../constants/user'

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
