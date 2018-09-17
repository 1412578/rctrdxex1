/*
 *
 * DiagramConstructPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, LOAD_DIAGRAM } from './constants';

export const initialState = fromJS({});

function diagramConstructPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_DIAGRAM:
      return state.set("diagramOpening", action.data);
    default:
      return state;
  }
}

export default diagramConstructPageReducer;
