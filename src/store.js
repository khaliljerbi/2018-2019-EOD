import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './Reducers/index';

const initialState = {};


// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleWare = [thunk];
// eslint-disable-next-line max-len
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleWare)));

export default store;
