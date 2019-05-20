import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers'
import setupSocket from '../sockets'
import rootSaga from '../sagas'
import username from '../utils/names'

const initialState = {};
const sagaMiddleware = createSagaMiddleware()

const middleware = [thunk, sagaMiddleware];

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    window._REDUX_DEVTOOLS_EXTENSION_ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
))

const socket = setupSocket(store.dispatch, username)

sagaMiddleware.run(rootSaga, {socket, username})

export default store;