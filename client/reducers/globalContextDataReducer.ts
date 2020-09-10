import { AppActions } from '../types/actions';

export const globalContextDataReducer = (state = '', action: AppActions): string => {
  switch (action.type) {
    case 'SET_GLOBAL_CONTEXT_DATA':
      return action.payload;
    default:
      return state;
  }
};