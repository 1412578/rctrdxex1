/*
 *
 * ChartPage actions
 *
 */

import { DEFAULT_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function sendMessage(){
  return (dispatch, getState) {
    dispatch({
      type: SEND_REQUEST
      
    })
  }
}
