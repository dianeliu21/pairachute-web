import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  const enhancer = compose(applyMiddleware(thunk));
  return createStore(reducer, initialState, enhancer);
}
