import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import activeComponentsReducer from './active_components_reducer';
import pageDataReducer from './page_data_reducer';
import pageStyleReducer from './page_style_reducer';

const reducers = {
  activeComponents: activeComponentsReducer,
  pageData: pageDataReducer,
  pageStyle: pageStyleReducer,
  form: formReducer,
}

const reducer = combineReducers(reducers);

export default reducer;
