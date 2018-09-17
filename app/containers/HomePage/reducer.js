/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import { API_REQUEST, API_REQUEST_SUCCESS, API_REQUEST_FAILURE,
          LIST_DIAGRAM_FAILURE, LIST_DIAGRAM_SUCCESS, LIST_DIAGRAM_REQUEST } from './constants';

// The initial state of the App
export const initialState = fromJS({});

function diagramListReducer(state = fromJS({_loading: false, _success: false, data: []}), action) {
  switch (action.type){
    case LIST_DIAGRAM_REQUEST:
      return state.set("_loading", true); 
    case LIST_DIAGRAM_SUCCESS:
      return state.set("_loading", false)
                  .set("_success", true)
                  .set("data", action.data);
    case LIST_DIAGRAM_FAILURE:
      return state.set("loading", false)
                  .set("success", false);
    default:
     return state;
  } 
}

function homeReducer(state = initialState, action) {
  return state.set("list-diagram", diagramListReducer(state.get("list-diagram"), action));
}

export default homeReducer;
