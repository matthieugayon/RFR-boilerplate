import { redirect } from 'redux-first-router'
import { store } from '../configureStore'
import BASE_URL from '../config'

const API_URL = `${BASE_URL}api/`

export function callApi(config, authenticated) {
  const { endpoint, ...requestConfig } = config

  if (authenticated) {
    const { session: { access_token } = {} } = store.getState()
    if (access_token) {
      requestConfig.headers = requestConfig.headers || {}
      requestConfig.headers.Authorization = `Bearer ${access_token}`
    }
    else {
      throw new Error('No token saved!')
    }
  }

  return fetch(API_URL + endpoint, requestConfig)
    .then(response => response.json().then(data => ({ data, response })))
    .then(({ data, response }) => {
      if (response.status === 401) {
        store.dispatch(redirect({ type: 'LOGIN' }))
      }
      if (!response.ok) {
        return Promise.reject(data.message)
      }
      return data
    })
    .catch(err => console.log('Error: ', err))
}

export const CALL_API = Symbol('Call API')

export default () => next => action => {
  const callAPI = action[CALL_API]

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const { endpoint, types, authenticated } = callAPI

  /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "requestType" }] */
  const [requestType, successType, errorType] = types

  // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
  return callApi({ endpoint }, authenticated).then(
    response =>
      next({
        response,
        authenticated,
        type: successType
      }),
    error => next({
      error: error.message || 'There was an error.',
      type: errorType
    })
  )
}
