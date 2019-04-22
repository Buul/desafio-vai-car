import { combineReducers } from 'redux';
import busyCounterReducer from './busyCounterReducer';
import dialogReducer from './dialogReducer';

const rootReducer = combineReducers({
  busyCounterReducer,
  dialogReducer,
});

export default rootReducer;
