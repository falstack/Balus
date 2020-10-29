import {
  SET_USER_INFO
} from '../constants/user'

const INITIAL_STATE = {
  isLogin: false,
  info: null,
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        isLogin: true,
        info: action.user
      }
    default:
      return state
  }
}
