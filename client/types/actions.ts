import { Person } from './index';

interface HelloWorldAction {
  type: 'ADD_TO_HELLO_WORLD';
  payload: string;
}

interface AddPersonAction {
  type: 'SET_NAMES';
  payload: Person;
}

interface GlobalTextAction {
  type: 'SET_GLOBAL_TEXT';
  payload: string;
}

interface GlobalContextDataAction {
  type: 'SET_GLOBAL_CONTEXT_DATA';
  payload: string;
}

export type AppActions = HelloWorldAction | AddPersonAction | GlobalTextAction | GlobalContextDataAction;