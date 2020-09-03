import { AppActions } from '../types/actions';

export const setGlobalText = (text: string): AppActions => ({
  type: 'SET_GLOBAL_TEXT',
  payload: text,
});

export const setGlobalContextData = (url: string): AppActions => ({
    type: 'SET_GLOBAL_CONTEXT_DATA',
    payload: url,
  });