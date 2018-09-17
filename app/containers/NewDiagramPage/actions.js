/*
 *
 * NewDiagramPage actions
 *
 */

import { DEFAULT_ACTION, NEW_DIAGRAM_REQUEST, NEW_DIAGRAM_SUCCESS } from './constants';
import { fakeService } from '../../utils/fakeService';
import { loadListDiagram } from '../HomePage/actions';
import { push } from "react-router-redux";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function newDiagram(data){
  return (dispatch, getState) =>{
    dispatch(request());
    fakeService.createDiagram(data.title, data.description).then(()=>{
      dispatch(success());
      dispatch(loadListDiagram());
      dispatch(push("/"));
    })
    .catch(err=>{
    });
  }
  function request(){
    return {
      type: NEW_DIAGRAM_REQUEST
    }
  }
  function success(){
    return {
      type: NEW_DIAGRAM_SUCCESS
    }
  }
}
