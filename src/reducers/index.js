import { combineReducers } from 'redux';
import sharedReducer from './shared-reducer';

const rootReducer = combineReducers({
  shared: sharedReducer
});

export default rootReducer;