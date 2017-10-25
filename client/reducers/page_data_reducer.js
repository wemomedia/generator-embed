import * as types from '../actions/types';

const defaultData = {
  editingIndex: null,
  saving: false,
  editing: true,
  viewMode: 'editing',
  controllerMenu: 'component',
  pageTitleForm: false
}

export default function(state = defaultData, action) {
  switch (action.type) {
    case types.LOAD_PAGE_DATA:
      return Object.assign(
        {},
        state,
        action.payload,
        defaultData
      );

    case types.SET_PAGE_DATA:
      return defaultData;

    case types.CHANGE_EDITING_INDEX:
      return Object.assign({}, state, { editingIndex: action.payload});

    case types.TOGGLE_PREVIEW:
      // console.log(state.payload.editing)
      if (action.payload) {
        return Object.assign({}, state, { editing: action.payload.editing });
      } else {
        const editing = !state.editing;
        return Object.assign({}, state, { editing });
      }

    case types.CHANGE_VIEW_MODE:
      const newViewMode = action.payload;
      return Object.assign({}, state, { viewMode: newViewMode })

    case types.TOGGLE_CONTROLLER_MENU:
      const controllerMenu = action.payload;
      if (controllerMenu !== state.controllerMenu) {
        return Object.assign({}, state, { controllerMenu });
      } else {
        return Object.assign({}, state, { controllerMenu: null });
      }

    case types.SAVE_PAGE:
      return Object.assign({}, state, { saving: true, editing: false });

    case types.TOGGLE_TITLE_FORM:
      return Object.assign({}, state, { pageTitleForm: !state.pageTitleForm });
  }
  return state;
}
