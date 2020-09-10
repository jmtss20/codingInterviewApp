import { AppActions } from '../types/actions';

export const roomReducer = (state = '', action: AppActions): string => {
  switch (action.type) {
    case 'SET_ROOM':
      return action.payload;
    default:
      return state;
  }
};
