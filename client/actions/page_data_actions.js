import { browserHistory } from 'react-router';

import * as types from '../actions/types';

export function loadSavedPageData(pageData) {
  return {
    type: types.LOAD_PAGE_DATA,
    payload: pageData
  }
}

export function setPageData() {
  return {
    type: types.SET_PAGE_DATA
  }
}

export function changeComponentForEditing(componentIndex) {
  const payload = componentIndex ? parseInt(componentIndex) : null;
  return {
    type: types.CHANGE_EDITING_INDEX,
    payload
  }
}

export function changeViewMode(e, viewMode) {
  e.preventDefault();
  return function(dispatch) {
    dispatch({ type: types.CHANGE_VIEW_MODE, payload: viewMode });
    dispatch({ type: types.TOGGLE_CONTROLLER_MENU, payload: null });

    if (viewMode === 'fullscreen') {
      dispatch({ type: types.TOGGLE_PREVIEW, payload: {editing: false} });
    } else if (viewMode === 'editor') {
      dispatch({ type: types.TOGGLE_PREVIEW, payload: {editing: true} });
    } else if (viewMode === 'mobile') {
      dispatch({ type: types.TOGGLE_PREVIEW, payload: {editing: true} })
    }
  }
}

export function toggleControllerMenu(e, menu) {
  if (e) e.preventDefault();

  return {
    type: types.TOGGLE_CONTROLLER_MENU,
    payload: menu
  }
}

export function setPageTitle() {
  return function(dispatch, getState) {
    dispatch({ type: types.TOGGLE_TITLE_FORM });
    dispatch({ type: types.SAVE_PAGE });
    dispatch({ type: types.CHANGE_VIEW_MODE, payload: 'fullscreen' });
  }
}

export function savePage(formData) {
  const title = formData.title;
  return function(dispatch, getState) {
    dispatch({ type: types.TOGGLE_TITLE_FORM });

    if (title) {
      getStyles();
    } else {
      browserHistory.push('/templates');
    }

    function getStyles() {
      const xhttp = new XMLHttpRequest();
      xhttp.open('GET', 'bundle.css');
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4) {
          if (xhttp.status === 200) {
            const styles = xhttp.responseText;
            setTimeout(savePageToDB.bind(null, styles), 1000);
          }
        }
      }
      xhttp.send();
    }

    function savePageToDB(style) {
      const token = localStorage.getItem('token');
      const state = getState();
      const htmlString = document.getElementById('app').innerHTML;
      const resultHtml = '<div><style>' + style + '</style>' + htmlString + '</div>';
      const stateData = {
        activeComponents: state.activeComponents,
        pageStyle: state.pageStyle
      }

      const data = JSON.stringify({
        title,
        token,
        resultHtml,
        pageData: JSON.stringify(stateData)
      });

      const xhr = new XMLHttpRequest();
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4 && this.status === 200) {
          browserHistory.push('/templates');
        }
      });
      xhr.open('POST', '/api/pages');
      xhr.setRequestHeader('authorization', token);
      xhr.send(data);
    }
  }
}

export function getPages() {
  return function(dispatch) {
    const token = localStorage.getItem('token');
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        const pages = JSON.parse(this.responseText);
        dispatch({ type: STORE_PAGES, payload: pages });
      }
    });

    xhr.open('GET', '/api/pages');
    xhr.setRequestHeader('authorization', token);
    xhr.send();
  }
}

// extension actions

// export function addPluginComponent(data) {
//   return {
//     type: 'ADD_PLUGIN_COMPONENT',
//     payload: data
//   }
// }
