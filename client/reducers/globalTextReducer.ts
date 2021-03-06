import { AppActions } from '../types/actions';

export const globalTextReducer = (state = '', action: AppActions): string => {
  switch (action.type) {
    case 'SET_GLOBAL_TEXT':
      return action.payload;
    default:
      return state;
  }
};