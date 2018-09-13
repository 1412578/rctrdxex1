/*
 *
 * Form reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './constants';

export const initialState = fromJS({});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state.set("request", true);
    case LOGIN_SUCCESS:
      return state.set("request", false).set("success", true);
    case LOGIN_FAILURE:
      return state.set("request", false).set("success", false);
    default:
      return state;
  }
}

export default loginPageReducer;
