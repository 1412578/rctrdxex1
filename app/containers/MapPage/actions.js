/*
 *
 * MapPage actions
 *
 */

import { DEFAULT_ACTION,
         GOOGLE_MAP_API_FAILURE,
         GOOGLE_MAP_API_SUCCESS, 
         GOOGLE_MAP_API_REQUEST,
         SHOW_MARKERS_PANEL,
         SELECT_MARKER,
         LEAVE_MARKER,
         MOVE_LENS,
        } from './constants';
import loadGoogleMapAPI from 'load-google-maps-api';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function showMarkersPanel(){
  return {
    type: SHOW_MARKERS_PANEL,
  }
}
export function loadMap(key){
  return (dispatch, getState) => {
    dispatch(request());
    loadGoogleMapAPI({key: key}).then(googleMap => {
      dispatch(success(googleMap));
    })
    .catch(err => {
      dispatch(failure(err));
    });
  };
  function request(){
    return {
      type: GOOGLE_MAP_API_REQUEST,
    };
  }
  function success(googleMap){
    return {
      type: GOOGLE_MAP_API_SUCCESS,
      mapApi: googleMap,
    };
  }
  function failure(err){
    return {
      type: GOOGLE_MAP_API_FAILURE,
      err: err,
    };
  }
}

export function selectMarker(markerId){
 return {
   type: SELECT_MARKER,
   markerId: markerId,
 } 
}

export function leaveMarker(){
  return {
    type: LEAVE_MARKER,
  }
}

export function moveLens(x, y){
  return {
    type: MOVE_LENS,
    position: {x, y},
  }
}