import { AppActions } from '../types/actions';

const helloWorldReducer = (state = '', action: AppActions): string => {
  switch (action.type) {
    case 'ADD_TO_HELLO_WORLD':
      return action.payload;
    default:
      return state;
  }
};

export default helloWorldReducer;