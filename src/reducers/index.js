import { combineReducers } from 'redux'
import { sentPrompts } from './promptReducers'
import { userInfo } from './userReducers'

const reducer = combineReducers({
  sentPrompts,
  userInfo
});

export default reducer;
