import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from '../actions/auth/session'

const initialState = {
  isFetching: false,
  isAuthenticated: false
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        ...action.payload
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        ...action.payload
      }
    case LOGOUT:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
