import ReactDOM from "react-dom";
import React from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import rootReducer from './reducers'
import { AppActions } from './types/actions'
import { AppState } from './types'

import { App } from './App';
import "./styles.scss";

const initialState = {
    globalText: '',
    globalContextData: '',
}

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>))
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
)