import { CodeEditor, Prompt } from './index';

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

interface PromptData {
  type: 'SET_PROMPT_DATA';
  payload: Prompt;
}

export type AppActions = GlobalTextAction | GlobalContextDataAction | CodeEditorData | PromptData;
