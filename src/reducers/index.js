import { combineReducers } from 'redux';
import * as promptReducers from './promptReducers';

const reducer = combineReducers({
  promptReducers,
});

export default reducer;
