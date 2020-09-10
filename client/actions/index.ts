import { AppActions } from '../types/actions';
import { CodeEditor, Prompt } from '../types';

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

export const setPromptData = (data: Prompt): AppActions => ({
  type: 'SET_PROMPT_DATA',
  payload: data,
});

export const setSessionStatus = (status: boolean): AppActions => ({
  type: 'SET_SESSION_STATUS',
  payload: status,
});

export const setRoom = (room: string): AppActions => ({
  type: 'SET_ROOM',
  payload: room,
});
