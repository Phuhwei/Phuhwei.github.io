import ReactDOM from 'react-dom';
import React from 'react';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import App from './containers/App';


const reducers = combineReducers({});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk, routerMiddleware(hashHistory)));

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/(:filter)" component={App} />
    </Router>
  </Provider>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept(reducers, () => {
    const nextRootReducer = reducers;
    store.replaceReducer(nextRootReducer);
  });
}
