import { AppActions } from '../types/actions';
import { CodeEditor } from '../types';

export const setGlobalText = (text: string): AppActions => ({
  type: 'SET_GLOBAL_TEXT',
  payload: text,
});

export const setGlobalContextData = (url: string): AppActions => ({
  type: 'SET_GLOBAL_CONTEXT_DATA',
  payload: url,
});

export const setCodeEditorData = (data: CodeEditor): AppActions => ({
  type: 'SET_CODE_EDITOR_DATA',
  payload: data,
});
