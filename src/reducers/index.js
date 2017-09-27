import { combineReducers } from 'redux'
import { sentPrompts } from './promptReducers'
import { userInfo, createUserInfo, createPairInfo } from './userReducers'

const reducer = combineReducers({
  sentPrompts,
  userInfo,
  createUserInfo,
  createPairInfo,
});

export default reducer;
