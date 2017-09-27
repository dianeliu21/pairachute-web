import * as types from './actionTypes'
import fb from '../config/initializeFirebase'
var db = fb.database()

export function fetchUsers () {
  return async function (dispatch) {
    try {
      dispatch({ type: types.FETCH_USERS_ATTEMPT })
      var usersRef = db.ref('/users')
      let users = (await usersRef.once('value')).val()
      dispatch({ type: types.FETCH_USERS_SUCCESS, users })

    } catch (e) {
      dispatch({ type: types.FETCH_USERS_FAILURE })
    }
  }
}

export function createUser (firstName, lastName, emailAddress, reflectionType) {
  return async function (dispatch) {
    try {
      dispatch({ type: types.CREATE_USER_ATTEMPT })
      let response = await fb.auth().createUserWithEmailAndPassword(emailAddress, 'pairachute')
      await response.updateProfile({displayName: firstName + ' ' + lastName})

      var updates = {}
      var newUserInfo = {
        first_name: firstName,
        last_name: lastName,
        email: emailAddress,
        reflection_type: reflectionType,
        threads: {},
        isPaired: false,
      }
      if (reflectionType === 'solo') {
        var threadKey = db.ref('threads').push().key
        newUserInfo.threads[threadKey] = true
      }
      updates['/users/' + response.uid] = newUserInfo
      var threadInfo = {
        type: 'reflection_only',
        isReflection: true,
        users: {}
      }
      threadInfo.users[response.uid] = true
      updates['/threads/' + threadKey] = threadInfo

      await db.ref().update(updates)
      dispatch(createUserSuccess('Successfully created new user!'))
    } catch (error) {
      dispatch(createUserFailure(error.message))
    }
  }
}

export function createPair (user1, user2, reflectionType) {
  return async function (dispatch) {
    try {
      dispatch({ type: types.CREATE_PAIR_ATTEMPT })
      var updates = {}
      let user1Obj = (await db.ref('/users/' + user1).once('value')).val()
      let user2Obj = (await db.ref('/users/' + user2).once('value')).val()

      var user1Info = Object.assign({}, user1Obj, {
        threads: {},
        isPaired: true,
        pairId: user2
      })
      var user2Info = Object.assign({}, user2Obj, {
        threads: {},
        isPaired: true,
        pairId: user1
      })

      let threadKey = await db.ref('threads').push().key
      user1Info.threads[threadKey] = true
      user2Info.threads[threadKey] = true

      updates['/users/' + user1] = user1Info
      updates['/users/' + user2] = user2Info

      var threadInfo = {
        type: '',
        isReflection: null,
        users: {}
      }
      threadInfo.users[user1] = true
      threadInfo.users[user2] = true
      if (reflectionType === 'solo') {
        threadInfo.type = 'chat_only'
        threadInfo.isReflection = false
      } else {
        threadInfo.type = 'reflection_and_chat'
        threadInfo.isReflection = true
      }

      updates['/threads/' + threadKey] = threadInfo
      await db.ref().update(updates)
      dispatch(createPairSuccess('Successfully created new pair!'))
    } catch (error) {
      dispatch(createPairFailure(error.message))
    }
  }
}

function createUserSuccess(successMessage) {
  return {
    type: types.CREATE_USER_SUCCESS,
    successMessage
  }
}

function createPairSuccess(successMessage) {
  return {
    type: types.CREATE_PAIR_SUCCESS,
    successMessage
  }
}

function createUserFailure(errorMessage) {
  return {
    type: types.CREATE_USER_FAILURE,
    errorMessage
  }
}

function createPairFailure(errorMessage) {
  return {
    type: types.CREATE_PAIR_FAILURE,
    errorMessage
  }
}
