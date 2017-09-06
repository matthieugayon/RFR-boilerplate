import { redirect } from 'redux-first-router'
import { store } from '../../configureStore'
import { endpoints } from '../../config'
import { callApi } from '../../middlewares/api'
import { isServer } from '../../utils'

// constants

export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'
export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN'
export const SET_SESSION = 'SET_SESSION'
export const SET_USER = 'SET_USER'
export const DISCARD_ACCESS_TOKEN = 'DISCARD_ACCESS_TOKEN'
export const DISCARD_REFRESH_TOKEN = 'DISCARD_REFRESH_TOKEN'
export const DISCARD_SESSION = 'DISCARD_SESSION'
export const REFRESH_REQUEST = 'REFRESH_REQUEST'
export const REFRESH_SUCCESS = 'REFRESH_SUCCESS'
export const REFRESH_FAILURE = 'REFRESH_FAILURE'


const SESSION_TIMEOUT_THRESHOLD = 300 // Will refresh the access token 5 minutes before it expires
let sessionTimeout = null // session timeout pointer

// standard actions

function setAccessToken(token) {
  return {
    type: SET_ACCESS_TOKEN,
    token
  }
}

export function setSession(session) {
  return {
    type: SET_SESSION,
    session
  }
}

export function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}

function discardAccessToken() {
  return {
    type: DISCARD_ACCESS_TOKEN
  }
}

export function discardRefreshToken() {
  return {
    type: DISCARD_ACCESS_TOKEN
  }
}

function discardSession() {
  return {
    type: DISCARD_SESSION
  }
}

function requestRefresh() {
  return {
    type: REFRESH_REQUEST
  }
}

function refreshSuccess() {
  return {
    type: REFRESH_SUCCESS
  }
}

function refreshError() {
  return {
    type: REFRESH_FAILURE
  }
}

// thunks ( async actions ) + async hooks / utility functions

const setSessionTimeout = duration => {
  clearTimeout(sessionTimeout)
  sessionTimeout = setTimeout(
    refreshToken,
    (duration - SESSION_TIMEOUT_THRESHOLD) * 1000
  )
}

export const refreshToken = () => {
  const { session: { refresh_token, expires_in } } = store.getState()
  const config = {
    method: 'post',
    endpoint: endpoints.refresh,
    params: {
      token: refresh_token
    }
  }

  return dispatch => {
    if (!refresh_token) {
      dispatch(redirect({ type: 'LOGIN' }))
    }

    dispatch(discardAccessToken())
    dispatch(requestRefresh())

    return callApi(config, false)
      .then(data => {
        dispatch(refreshSuccess())
        dispatch(setAccessToken(data.token))
        if (!isServer) {
          setSessionTimeout(expires_in)
        }
      })
      .catch(() => {
        dispatch(refreshError())
        dispatch(discardSession())
        clearTimeout(sessionTimeout)
      })
  }
}

export const startRefreshInterval = () => {
  const { session: { expires_in } } = store.getState()
  setSessionTimeout(expires_in)
}

export const stopRefreshInterval = () => {
  clearTimeout(sessionTimeout)
}
