import createHistory from 'history/createMemoryHistory'
import { NOT_FOUND } from 'redux-first-router'
import configureStore from '../src/configureStore'
import { refreshToken } from '../src/actions/auth/session'

export default async (req, res) => {
  const access_token = req.cookies.access_token
  const refresh_token = req.cookies.refresh_token

  const preLoadedState = { session: { access_token, refresh_token } } // onBeforeChange will authenticate using this

  const history = createHistory({ initialEntries: [req.path] })
  const {
    store,
    thunk } = configureStore(history, preLoadedState)

  if (access_token) {
    const { exp } = Buffer.from(access_token, 'base64')

    if (exp) {
      const now = new Date()
      const expiry = new Date(exp)
      if (now.getTime() > expiry.getTime()) {
        // if the access_token is outdated try to refresh it
        await store.dispatch(refreshToken)

        const { session: { access_token } } = store.getState()

        // re set access_token cookie
        res.cookie('access_token', access_token, { maxAge: 900000 })
      }
    }
  }

  let location = store.getState().location
  if (doesRedirect(location, res)) return false

  await thunk(store)

  location = store.getState().location
  if (doesRedirect(location, res)) return false // only do this again if ur thunks have redirects

  const status = location.type === NOT_FOUND ? 404 : 200
  res.status(status)
  return store
}

const doesRedirect = ({ kind, pathname }, res) => {
  if (kind === 'redirect') {
    res.redirect(302, pathname)
    return true
  }
}
