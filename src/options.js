import { redirect } from 'redux-first-router'
import { isAllowed } from './utils'

export default {
  onBeforeChange: (dispatch, getState, action) => {
    console.log('action.type', action.type)
    console.log('allowed', allowed)
    const allowed = isAllowed(action.type, getState())

    if (!allowed) {
      const action = redirect({ type: 'LOGIN' })
      dispatch(action)
    }
  }
  /* onAfterChange: (dispatch, getState) => {} */
}
