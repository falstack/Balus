import {
  DEL_USER_INFO,
  SET_USER_INFO,
  UPDATE_USER_POCKET,
  REFRESH_USER_INFO
} from '../constants/user'

const INITIAL_STATE = {
  isLogin: false,
  info: {},
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        isLogin: true,
        info: action.user
      }
    case DEL_USER_INFO:
      return {
        ...state,
        isLogin: false,
        info: {}
      }
    case UPDATE_USER_POCKET:
      const value = Number(action.data)

      return {
        ...state,
        info: {
          ...state.info,
          wallet_coin: +parseFloat(+state.info.wallet_coin + value).toFixed(2)
        }
      }
    case REFRESH_USER_INFO:
      return {
        ...state,
        info: {
          ...state.info,
          ...action.data
        }
      }
    default:
      return state
  }
}
