import * as types from '../actions/types';

export function handleBackgroundChange(e, elem) {
  return function(dispatch, getState) {
    const rgba = `rgba(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a})`;
    const newPageData = Object.assign({}, getState().pageStyle);
    if (elem === 'background') {
      newPageData.background = rgba;
    } else if (elem === 'container') {
      newPageData.containerBackground = rgba;
    }
    return dispatch({ type: types.UPDATE_PAGE_STYLE, payload: newPageData });
  }
}

export function loadPageStyle(pageStyle) {
  return {
    type: types.LOAD_PAGE_STYLE,
    payload: pageStyle
  }
}
