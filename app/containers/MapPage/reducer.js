/*
 *
 * MapPage reducer
 *
 */

import { fromJS } from 'immutable';
import {  SHOW_MARKERS_PANEL,
          SELECT_MARKER,
          LEAVE_MARKER,
          MOVE_LENS,
       } from './constants';

export const initialState = fromJS({});

function mapPageReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MARKERS_PANEL:
      return state.set("showMarkersPanel", true);
    case SELECT_MARKER:
      return state.set("isMarkerSelecting", true)
                  .set("markerSelected", action.markerId);
    case LEAVE_MARKER:
      return state.set("isMarkerSelecting", false);
    case MOVE_LENS:
      return state.set("lens-x", action.position.x)
                  .set("lens-y", action.position.y);
    default:
      return state;
  }
}

export default mapPageReducer;
