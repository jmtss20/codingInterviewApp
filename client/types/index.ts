import rootReducer from '../reducers';
//TODO: this page is to define types for objects we will store

export interface CodeEditor {
  value: string;
  language: string;
}

export type AppState = ReturnType<typeof rootReducer>;
