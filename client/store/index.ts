import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../reducers/index'
import { AppActions } from '../types/actions'

export type AppState = ReturnType<typeof rootReducer>

const initialState = {helloWorld: "Hello World"}

export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)))