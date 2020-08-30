import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers/index'
import { AppActions } from './types/actions'

import App from './App';
import "./styles.scss";

export type AppState = ReturnType<typeof rootReducer>

const initialState = { helloWorld: "Hello World" }

export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)))

const mountNode = document.getElementById("app");
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    mountNode
)
