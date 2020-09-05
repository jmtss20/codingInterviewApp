import { combineReducers } from 'redux';
import globalTextReducer from './globalTextReducer';
import globalContextDataReducer from './globalContextDataReducer';
import codeEditorDataReducer from './codeEditorDataReducer';
import promptDataReducer from './promptDataReducer';

const rootReducer = combineReducers({
  globalText: globalTextReducer,
  globalContextData: globalContextDataReducer,
  codeEditorData: codeEditorDataReducer,
  promptData: promptDataReducer,
});

export default rootReducer;
