/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

import globalReducer from 'containers/App/reducer';
import {loginReducer} from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  location: null,
});

/**
 * Merge route into the global application state
 */
export function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
}

// Mouse tracking states
const mouseTrackingInitialState = {
  x: 0,
  y: 0,
  _x: 0,
  _y: 0,
  tracking: false,
}
const mouseTrackingReducer = (state = fromJS(mouseTrackingInitialState), action) =>{
  switch (action.type){
    case "TRACKING_CHANGE":
      if (state.get("tracking") === true)
        return state.set("x", action.x).set("y", action.y);
      else return state;
    case "BEGIN_TRACKING":
      return state.set("tracking", true).set("_x", action.x).set("_y", action.y);
    case "STOP_TRACKING":
      return state.set("tracking", false).set("_x", action.x).set("_y", action.y);
    default:
      return state;
  } 
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  console.log(injectedReducers);
  const appReducer = combineReducers({
    route: routeReducer,
    global: globalReducer,
    language: languageProviderReducer,
    form: formReducer,
    login: loginReducer,
    mouseTracking: mouseTrackingReducer,
    ...injectedReducers,
  });
  const rootReducer = (state, action) => {
    return appReducer(state, action);
  }
  return rootReducer;
}
