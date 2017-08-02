import * as types from '../actions/actionTypes'

export function userInfo (state = {}, action) {
  switch (action.type) {
    case types.FETCH_USERS_SUCCESS:
      return Object.assign({}, state, {
        users: action.users
      })
    default:
      return state
  }
}
