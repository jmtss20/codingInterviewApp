import rootReducer from '../reducers';
//TODO: this page is to define types for objects we will store

//example
export interface Goal {
  todo: string;
  deadline: string;
}

export interface Person {
  name: string;
  age: number;
  goals: Goal[];
}

export type AppState = ReturnType<typeof rootReducer>;
