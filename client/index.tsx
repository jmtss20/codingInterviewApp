import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { store } from './store/index'


import App from './App';
import "./styles.scss";

var mountNode = document.getElementById("app");
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    mountNode
)
