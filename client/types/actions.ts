import { CodeEditor } from './index';

interface GlobalTextAction {
  type: 'SET_GLOBAL_TEXT';
  payload: string;
}

interface GlobalContextDataAction {
  type: 'SET_GLOBAL_CONTEXT_DATA';
  payload: string;
}

interface CodeEditorData {
  type: 'SET_CODE_EDITOR_DATA';
  payload: CodeEditor;
}

export type AppActions = GlobalTextAction | GlobalContextDataAction | CodeEditorData;
