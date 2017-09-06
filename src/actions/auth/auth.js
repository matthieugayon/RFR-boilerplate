import { BASE_URL, endpoints } from '../../config'
import {
  setSession,
  discardSession,
  startRefreshInterval,
  stopRefreshInterval
} from './session'

// constants

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT'

// standard actions

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false
  }
}

function receiveLogin() {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function logout() {
  return {
    type: LOGOUT,
    isFetching: false,
    isAuthenticated: false
  }
}


// thunks ( async actions )

export function loginUser(credentials) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `email=${credentials.email}&password=${credentials.password}`
  }

  return dispatch => {
    dispatch(requestLogin(credentials))

    return fetch(BASE_URL + endpoints.authenticate, config)
      .then(response =>
        response.json().then(data => ({ data, response })))
            .then(({ data, response }) => {
              if (!response.ok) {
                dispatch(loginError(data.message))
                return Promise.reject(data.message)
              }
              dispatch(receiveLogin())
              dispatch(setSession({ ...data.tokens, user: data.user }))
              startRefreshInterval()
            }).catch(err => {
              console.log('Error: ', err)
            })
  }
}

export function logoutUser() {
  return dispatch => {
    dispatch(logout())
    dispatch(discardSession())
    stopRefreshInterval()
  }
}
