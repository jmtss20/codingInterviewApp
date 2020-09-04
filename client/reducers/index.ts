import { combineReducers } from 'redux';
import globalTextReducer from './globalTextReducer';
import globalContextDataReducer from './globalContextDataReducer';
import codeEditorDataReducer from './codeEditorDataReducer';

const rootReducer = combineReducers({
  globalText: globalTextReducer,
  globalContextData: globalContextDataReducer,
  codeEditorData: codeEditorDataReducer,
});

export default rootReducer;