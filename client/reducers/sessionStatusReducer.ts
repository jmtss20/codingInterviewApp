import { AppActions } from '../types/actions';

export const sessionStatusReducer = (state = false, action: AppActions): boolean => {
  switch (action.type) {
    case 'SET_SESSION_STATUS':
      return action.payload;
    default:
      return state;
  }
};
