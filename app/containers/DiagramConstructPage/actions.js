/*
 *
 * DiagramConstructPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_DIAGRAM } from './constants';
import { fakeService } from '../../utils/fakeService';
import { fromJS } from 'immutable';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadDiagram(id){
  return (dispatch, getState) => {
    fakeService.loadDiagram(id).then(data=>{
      dispatch(success(data));
    });
  }
  function success(data){
    return {
      type: LOAD_DIAGRAM,
      data: fromJS(data),
    }
  }
}
