import { LOAD_COMPONENTS, GET_PAGE_DATA } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case LOAD_COMPONENTS:
      emitHTML(action.payload)
      return action.payload;
    case GET_PAGE_DATA:
      emitHTML(state, action.payload)
      return state;
  }
  return state;
}

function emitHTML(data, config) {
  const parentId = localStorage.getItem('generator-embed-parentId')
  const messageId = config ? config.id : null

  const stylePath = () => {
    const storedPath = localStorage.getItem('generator-embed-basePath');
    if (storedPath) return storedPath + 'bundle.css'
    if (config) {
      return config.basePath ? config.basePath + 'bundle.css' : 'bundle.css'
    }
    return 'bundle.css'
  }

  function concatMarkup(styles) {
    const htmlString = document.getElementById('embed-page').innerHTML;
    const html = '<div><style>' + styles + '</style>' + htmlString + '</div>';
    return parent.postMessage({ html, data: JSON.stringify(data), id: messageId, parentId }, '*');
  }

  const xhttp = new XMLHttpRequest();
  xhttp.open('GET', stylePath());
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200) {
        const styles = xhttp.responseText;
        return concatMarkup(styles)
      } else {
        console.log('failed to fetch styles')
        return concatMarkup('')
      }
    }
  }
  return xhttp.send();
}
