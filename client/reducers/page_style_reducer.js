import * as types from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case types.UPDATE_PAGE_STYLE:
      return Object.assign({}, state, action.payload);
    case types.LOAD_PAGE_STYLE:
      return action.payload;
  }
  return state;
}
