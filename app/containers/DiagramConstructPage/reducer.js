/*
 *
 * DiagramConstructPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, LOAD_DIAGRAM, CHANGE_WIDTH,
         CHANGE_HEIGHT, SELECT_SHAPE } from './constants';

export const initialState = fromJS({width: 100, height: 100});

function diagramConstructPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_DIAGRAM:
      return state.set("diagramOpening", action.data);
    case CHANGE_WIDTH:
      return state.set("width", action.width);
    case CHANGE_HEIGHT:
      return state.set("height", action.height);
    case SELECT_SHAPE:
      return state.set("shape", action.shape);
    default:
      return state;
  }
}

export default diagramConstructPageReducer;
