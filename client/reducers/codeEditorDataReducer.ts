import { AppActions } from '../types/actions';
import { CodeEditor } from '../types';

export const codeEditorDataReducer = (state = { value: '', language: 'javascript' }, action: AppActions): CodeEditor => {
  switch (action.type) {
    case 'SET_CODE_EDITOR_DATA':
      return action.payload;
    default:
      return state;
  }
};
