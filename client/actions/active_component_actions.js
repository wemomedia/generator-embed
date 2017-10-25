import update from 'immutability-helper';

import * as types from '../actions/types';

// these functions are action creators
// action creators take in data from the component that called them and return an action
// actions are objects, with a 'type' property and a data 'payload'

// actions returned from these action creators are sent to ALL of our reducers by redux's 'dispatch' method
// reducers recieve actions and modify the application state with the attached payload
export function loadComponents(componentsArray) {
  return {
    type: types.LOAD_COMPONENTS,
    payload: componentsArray
  }
}

export function addComponent(e, componentData) {
  return function(dispatch, getState) {
    // add new component to activeComponents array
    const newComponentsArray = getState().activeComponents.slice();
    newComponentsArray.push(componentData);
    // dispatch new array to reducers
    dispatch({ type: types.LOAD_COMPONENTS, payload: newComponentsArray });
    // change editing component index
    dispatch({ type: types.CHANGE_EDITING_INDEX, payload: newComponentsArray.length - 1 });
    dispatch({ type: types.TOGGLE_CONTROLLER_MENU, payload: null });
    // scroll to new component
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 250);
  }
}

export function deleteComponent(e, componentIndex) {
  e.preventDefault();
  return function(dispatch, getState) {
    // deletes component at specified index
    // switches editor to previous component
    const newComponentsArray = getState().activeComponents.slice();
    newComponentsArray.splice(componentIndex, 1);
    // change editing component index
    dispatch({ type: types.CHANGE_EDITING_INDEX, payload: componentIndex - 1 });
    // dispatch new array to reducers
    dispatch({ type: types.LOAD_COMPONENTS, payload: newComponentsArray });
  }
}

export function reorderComponent(e, componentIndex, direction) {
  e.preventDefault();
  return function(dispatch, getState) {
    const newComponentArray = getState().activeComponents.slice();
    const currentIndex = parseInt(componentIndex);
    let newComponentIndex;
    let tempComponent;

    if (direction === 'up') {
      if (currentIndex === 1) return;
      newComponentIndex = parseInt(currentIndex) - 1;
      tempComponent = newComponentArray[newComponentIndex];
      newComponentArray[newComponentIndex] = newComponentArray[currentIndex];
      newComponentArray[currentIndex] = tempComponent;
    }

    if (direction === 'down') {
      if (currentIndex === getState().activeComponents.length - 1) return;
      newComponentIndex = parseInt(currentIndex) + 1;
      tempComponent = newComponentArray[newComponentIndex];
      newComponentArray[newComponentIndex] = newComponentArray[currentIndex];
      newComponentArray[currentIndex] = tempComponent;
    }

    dispatch({ type: types.LOAD_COMPONENTS, payload: newComponentArray });
    dispatch({ type: types.CHANGE_EDITING_INDEX, payload: newComponentIndex });
  }
}

export function handleEditorChange(e, ind, property, action) {
  const colorProps = [ 'buttonColor', 'buttonTextColor', 'backgroundColor', 'logoFillColor', 'textColor', 'subtextColor', 'overlayColor', 'quoteTextColor', 'linkColor', 'linkHoverColor', 'accentColor' ]
  return function (dispatch, getState) {
    // send credit updates to creditEditor
    if (property === 'credits') return creditEditor(e, ind, property, action, dispatch, getState);
    if (property === 'awards') return awardsEditor(e, ind, property, action, dispatch, getState);
    if (property === 'press') return pressEditor(e, ind, property, action, dispatch, getState);
    if (property === 'content') return contentEditor(e, ind, property, action, dispatch, getState);

    // on input change, update component state, set new component value
    let value;
    if (colorProps.indexOf(property) > -1) {
      // if component is the color picker
      value = `rgba(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a})`;
    } else if (property === 'text' && action === 'updateInline') {
      value = e;
    } else if (e.target.type === 'checkbox'){
      // handle checbox inputs
      value = e.target.checked;
    }else {
      value = e.target.value;
    }

    const newComponentState = update(getState().activeComponents, {
      [ind]: {data: {[property]: {$set: value}}}
    });

    dispatch({ type: types.LOAD_COMPONENTS, payload: newComponentState })
  }

  function pressEditor(e, ind, property, action, dispatch, getState) {
    e.preventDefault()
    if (action === 'updateItem') {
      const inputType = e.target.getAttribute('data-pressInput');
      const pressIndex = e.target.getAttribute('data-pressIndex');
      const newPresState = update(getState().activeComponents, {
        [ind]: {data: {articles: {[pressIndex]: {[inputType]: {$set: e.target.value}}}}}
      });
      return dispatch({ type: types.LOAD_COMPONENTS, payload: newPresState });
    } else if (action === 'addItem') {
      const pressData = {
        date: 'January 1, 2017',
        publication: 'wevr',
        url: 'http://blog.wevr.com/',
        snippet: '"The best example of VR’s potential so far."'
      }

      const newPressItem = update(getState().activeComponents, {
        [ind]: {data: {articles: {$push: [pressData]}}}
      });
      return dispatch({ type: types.LOAD_COMPONENTS, payload: newPressItem });
    } else if (action === 'deleteItem') {
      const deletedPress = update(getState().activeComponents, {
        [ind]: {data: {articles: {$splice: [[-1, 1]]}}}
      });
      return dispatch({ type: types.LOAD_COMPONENTS, payload: deletedPress });
    }
  }

  function contentEditor(e, ind, property, action, dispatch, getState) {
    e.preventDefault()
    if (action === 'updateUrl') {
      const inputType = e.target.getAttribute('data-contentInput');
      const contentIndex = e.target.getAttribute('data-contentIndex');
      const newConstentState = update(getState().activeComponents, {
        [ind]: {data: {items: {[contentIndex]: {[inputType]: {$set: e.target.value}}}}}
      });
      return dispatch({ type: types.LOAD_COMPONENTS, payload: newConstentState });
    }
  }

  function creditEditor(e, ind, property, action, dispatch, getState) {
    e.preventDefault()
    if (action === 'updateItem') {
      const inputType = e.target.getAttribute('data-creditInput');
      const creditIndex = e.target.getAttribute('data-creditIndex');
      const newCreditState = update(getState().activeComponents, {
        [ind]: {data: {credits: {[creditIndex]: {[inputType]: {$set: e.target.value}}}}}
      });
      return dispatch({ type: types.LOAD_COMPONENTS, payload: newCreditState });
    } else if (action === 'addItem') {
      const creditData = { name: 'Enter Name', role: 'Enter Role' }
      const newCreditItem = update(getState().activeComponents, {
        [ind]: {data: {credits: {$push: [creditData]}}}
      });
      return dispatch({ type: types.LOAD_COMPONENTS, payload: newCreditItem });
    } else if (action === 'deleteItem') {
      const deletedCredit = update(getState().activeComponents, {
        [ind]: {data: {credits: {$splice: [[-1, 1]]}}}
      });
      return dispatch({ type: types.LOAD_COMPONENTS, payload: deletedCredit });
    }
  }
}

function awardsEditor(e, ind, property, action, dispatch, getState) {
  e.preventDefault()
  if (action === 'addItem') {
    const awardData = { imageSrc: 'https://i.wevr.com/uploads/files/b4ebb0b4-6d68-410a-910c-f497c4aec6b8/tribeca.svg' }
    const newAward = update(getState().activeComponents, {
      [ind]: {data: {items: {$push: [awardData]}}}
    });
    return dispatch({ type: types.LOAD_COMPONENTS, payload: newAward });
  } else if (action === 'deleteItem') {
    const deletedAward = update(getState().activeComponents, {
      [ind]: {data: {items: {$splice: [[-1, 1]]}}}
    });
    return dispatch({ type: types.LOAD_COMPONENTS, payload: deletedAward });
  }
}

export function sourceChange(e) {
    e.preventDefault();
    return function(dispatch, getState) {
      // recieves events from page editor, when inputs change
      // updates page elements source attributes
      const targetId = e.target.id
      const componentIndex = parseInt(e.target.getAttribute('data-index'));

      switch (targetId) {
        case 'video-url-editor':
          const url = e.target.value;
          const newVideoUrl = update(getState().activeComponents, {
            [componentIndex]: {data: {embedURL: {$set: url}}}
          });
          return dispatch({ type: types.LOAD_COMPONENTS, payload: newVideoUrl });
        case 'fullscreen-video-source-editor':
          const fullVidUrl = e.target.value;
          console.log(fullVidUrl)
          const fullVidSource = update(getState().activeComponents, {
            [componentIndex]: {data: {embedURL: {$set: fullVidUrl}}}
          });
          return dispatch({ type: types.LOAD_COMPONENTS, payload: fullVidSource });
        default:
          return dispatch({ type: types.LOAD_COMPONENTS, payload: getState().activeComponents });
      }
    }
  }

  export function updateImageSource(componentIndex, url, i) {
    return function(dispatch, getState) {
      const imageURL = url;
      let newImageSource;
      if (!Number.isInteger(i)) {
        newImageSource = update(getState().activeComponents, {
          [componentIndex]: {data: {image: {$set: imageURL}}}
        });
      } else {
        newImageSource = update(getState().activeComponents, {
          [componentIndex]: {data: {items: {[i]: {image: {$set: imageURL}}}}}
        });
      }
      return dispatch({ type: types.LOAD_COMPONENTS, payload: newImageSource });
    }
  }
