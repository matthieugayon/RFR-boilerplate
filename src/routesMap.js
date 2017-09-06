// import { redirect, NOT_FOUND } from 'redux-first-router'
// import { callApi } from './middlewares/api'

export default {
  LOGIN: '/login',
  HOME: {
    path: '/',
    protected: true
    /* thunk: async (dispatch, getState) => {
      const {
        jwToken,
        location: { payload: { category } },
        videosByCategory
      } = getState()
      const videos = await fetchData(`/api/videos/${category}`, jwToken)
      if (videos.length === 0) {
        dispatch({ type: NOT_FOUND })
      }
      const action = redirect({ type: 'VIDEO'})
      dispatch(action)
    } */
  }
}
