import routesMap from './routesMap'

export const isServer = typeof window === 'undefined'

export const isAllowed = (type, state) => {
  // if route is protected , see in ./routesMap.js
  const isProtected = routesMap[type] && routesMap[type].protected

  console.log('isProtected', isProtected)

  const isAuthenticated = state.session.access_token

  if (isProtected) return isAuthenticated
  return true
}
