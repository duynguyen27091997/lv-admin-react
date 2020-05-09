import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from "./reducer/rootReducer";
import Startup from "./components/Startup";

const store = createStore( combineReducers({
        main:rootReducer
    }),
    composeWithDevTools(
        applyMiddleware(
            thunkMiddleware, // lets us dispatch() functions
        ))
);

ReactDOM.render(
    <Provider store={store}>
        <Startup>
        </Startup>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
