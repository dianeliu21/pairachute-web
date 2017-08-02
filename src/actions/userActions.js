import * as types from './actionTypes'
import fb from '../config/initializeFirebase'
var db = fb.database()

export function fetchUsers () {
  return async function (dispatch) {
    try {
      dispatch({type: types.FETCH_USERS_ATTEMPT})
      var usersRef = db.ref('/users')
      let users = (await usersRef.once('value')).val()
      dispatch({type: types.FETCH_USERS_SUCCESS, users})

    } catch (e) {
      dispatch({type: types.FETCH_USERS_FAILURE})
    }
  }
}
