import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Router, browserHistory } from 'react-router';

import { LOAD_COMPONENTS, SET_PAGE_DATA, GET_PAGE_DATA, CHANGE_EDITING_INDEX, TOGGLE_CONTROLLER_MENU, ADD_PLUGIN_COMPONENT, SET_THEME } from './actions/types';
import routes from './routes';
import reducers from './reducers';

// add redux thunk as middleware to store
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

////////////////////////
//embed init listeners//
////////////////////////
window.addEventListener('message', e => {
  if (e.data.call === 'configPage') {
    const componentData = JSON.parse(e.data.config.components);
    const themeData = JSON.parse(e.data.config.theme);
    const parentId = e.data.config.parentId;
    const basePath = e.data.config.basePath ? e.data.config.basePath : null;

    // persist app id and basePath
    localStorage.setItem('generator-embed-parentId', parentId);
    if (basePath) localStorage.setItem('generator-embed-basePath', basePath);

    // load components
    store.dispatch({ type: LOAD_COMPONENTS, payload: componentData });
    store.dispatch({ type: SET_THEME, payload: themeData });
    store.dispatch({ type: SET_PAGE_DATA });
    browserHistory.push('/build');
  } else if (e.data.call === 'getData') {
    store.dispatch({ type: GET_PAGE_DATA, payload: e.data });
  }
}, false);
////////////////////////////
//end embed init listeners//
////////////////////////////


/////////////////////////
//start plugin listener//
/////////////////////////
window.addEventListener('generator-register-plugin', e => {
  const fileUrls = e.detail.urls
  var viewPromise = readComponentData(fileUrls.view)
  var editorPromise = readComponentData(fileUrls.editor)
  var dataPromise = readComponentData(fileUrls.data)

  function readComponentData(url) {
    return new Promise((resolve, reject) => {
      //get component data from file
      var client = new XMLHttpRequest();
      client.open('GET', url);
      client.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          const componentString = client.responseText;
          resolve(componentString)
        }
      }
      client.send();
    })
  }

  Promise.all([viewPromise, editorPromise, dataPromise])
  .then(values => {
    const componentStrings = { view: values[0], editor: values[1], data: values[2] }
    insertComponent(componentStrings)
  });

  function insertComponent(strings) {
    const data = JSON.parse(strings.data);
    // translate component from string to function
    const viewTranslate = Babel.transform(strings.view, { presets: ['es2017', 'react'] }).code;
    const editorTranslate = Babel.transform(strings.editor, { presets: ['es2017', 'react'] }).code;
    const ViewComponent = eval('(' + viewTranslate + ')')
    const EditorComponent = eval('(' + editorTranslate + ')')

    // add component data to component index
    const newComponent = { view: {}, editor: {} }
    newComponent.view[data.title] = ViewComponent
    newComponent.editor[data.title + 'Editor'] = EditorComponent

    // props.addPluginComponent(newComponent, data)
    store.dispatch({ type: ADD_PLUGIN_COMPONENT, payload: newComponent })
    // add component to active component list
    setTimeout(() => addComponent(null, data), 1500);
  }

  function addComponent(e, componentData) {
    const newComponentsArray = store.getState().activeComponents.slice();
    newComponentsArray.push(componentData);
    store.dispatch({ type: LOAD_COMPONENTS, payload: newComponentsArray });
    store.dispatch({ type: CHANGE_EDITING_INDEX, payload: newComponentsArray.length - 1 });
    store.dispatch({ type: TOGGLE_CONTROLLER_MENU, payload: null });
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 250);
  }
})
////////////////////////
// end plugin listener//
////////////////////////


const app = document.getElementById('app');

render((
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
), app);
