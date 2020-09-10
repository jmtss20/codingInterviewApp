import { combineReducers } from 'redux';
import { globalTextReducer } from './globalTextReducer';
import { globalContextDataReducer } from './globalContextDataReducer';
import { codeEditorDataReducer } from './codeEditorDataReducer';
import { promptDataReducer } from './promptDataReducer';
import { sessionStatusReducer } from './sessionStatusReducer';
import { roomReducer } from './roomReducer';

const rootReducer = combineReducers({
  globalText: globalTextReducer,
  globalContextData: globalContextDataReducer,
  codeEditorData: codeEditorDataReducer,
  promptData: promptDataReducer,
  sessionStatus: sessionStatusReducer,
  room: roomReducer,
});

export default rootReducer;
