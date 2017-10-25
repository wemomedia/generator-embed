import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Router, browserHistory } from 'react-router';

import { LOAD_COMPONENTS, SET_PAGE_DATA, GET_PAGE_DATA } from './actions/types';
import routes from './routes';
import reducers from './reducers';

// add redux thunk as middleware to store
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

window.addEventListener('message', e => {
  if (e.data.call === 'configPage') {
    const componentData = JSON.parse(e.data.config.components);
    const parentId = e.data.config.parentId;
    const basePath = e.data.config.basePath ? e.data.config.basePath : null;

    // persist app id and basePath
    localStorage.setItem('generator-embed-parentId', parentId);
    if (basePath) localStorage.setItem('generator-embed-basePath', basePath);

    // load components
    store.dispatch({ type: LOAD_COMPONENTS, payload: componentData });
    store.dispatch({ type: SET_PAGE_DATA });
    browserHistory.push('/build');
  } else if (e.data.call === 'getData') {
    store.dispatch({ type: GET_PAGE_DATA, payload: e.data });
  }
}, false);

const app = document.getElementById('app');

render((
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
), app);
