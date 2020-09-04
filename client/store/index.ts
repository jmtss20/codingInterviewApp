import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import rootReducer from '../reducers'
import { AppActions } from '../types/actions'
import { AppState } from '../types'

const initialState = {
  globalText: '',
  globalContextData: '',
  codeEditorData: { value: '', language: 'javascript' },
}

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>))
)