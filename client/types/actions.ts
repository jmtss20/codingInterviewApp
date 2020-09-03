import { Person } from './index';

interface HelloWorldAction {
  type: 'ADD_TO_HELLO_WORLD';
  payload: string;
}

interface AddPersonAction {
  type: 'SET_NAMES';
  payload: Person;
}

export type AppActions = HelloWorldAction | AddPersonAction;