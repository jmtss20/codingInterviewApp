import { AppActions } from '../types/actions';
import { Prompt } from '../types';

export const promptDataReducer = (state = { title: '', text: '' }, action: AppActions): Prompt => {
  switch (action.type) {
    case 'SET_PROMPT_DATA':
      return action.payload;
    default:
      return state;
  }
};
