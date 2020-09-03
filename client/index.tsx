import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { AppActions } from './types/actions'
import rootReducer from './reducers/index'
import { Provider } from 'react-redux';
import ReactDOM from "react-dom";
import React from 'react';

import App from './App';
import "./styles.scss";



export type AppState = ReturnType<typeof rootReducer>

const initialState = { helloWorld: "Hello World" }

export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)))



ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
)

