import { combineReducers } from 'redux';
import globalTextReducer from './globalTextReducer';
import globalContextDataReducer from './globalContextDataReducer';

const rootReducer = combineReducers({
  globalText: globalTextReducer,
  globalContextData: globalContextDataReducer
});

export default rootReducer;