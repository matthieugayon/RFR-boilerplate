import {
  SET_ACCESS_TOKEN,
  SET_REFRESH_TOKEN,
  SET_SESSION,
  SET_USER,
  DISCARD_ACCESS_TOKEN,
  DISCARD_REFRESH_TOKEN,
  DISCARD_SESSION
} from '../actions/auth/session'

const initialState = {
  access_token: null,
  expires_in: null,
  refresh_token: null,
  user: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        access_token: action.token
      }
    case SET_REFRESH_TOKEN:
      return {
        ...state,
        refresh_token: action.token
      }
    case SET_SESSION:
      return {
        ...state,
        ...action.session.tokens,
        // access_token: action.session.access_token,
        // refresh_token: action.session.refresh_token,
        // expires_in: action.session.expires_in,
        user: action.session.user
      }
    case SET_USER:
      return {
        ...state,
        user: action.user
      }
    case DISCARD_ACCESS_TOKEN:
      return {
        ...state,
        access_token: null,
        expires_in: null
      }
    case DISCARD_REFRESH_TOKEN:
      return {
        ...state,
        refresh_token: null
      }
    case DISCARD_SESSION:
      return {}
    default:
      return state
  }
}
