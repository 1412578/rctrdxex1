/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { CHANGE_USERNAME, API_REQUEST, API_REQUEST_FAILURE, API_REQUEST_SUCCESS,
          LIST_DIAGRAM_FAILURE, LIST_DIAGRAM_REQUEST, LIST_DIAGRAM_SUCCESS } from './constants';
import requestUtils from 'utils/request';
import { fakeService } from 'utils/fakeService';
import {fromJS} from 'immutable';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeUsername(name) {
  return {
    type: CHANGE_USERNAME,
    name,
  };
}

export function submit(){
  return (dispatch, getState) =>{
    dispatch(request());
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then(res => {
        if (!res.ok)
          throw new Error(res.statusText);
        return res.json();
      })
      .then(data => {
        dispatch(success(data));
      })
      .catch(err=>{
        dispatch(failure(err)); 
      });
  }
  function success(data) {
    return {
      type: API_REQUEST_SUCCESS,
      data: data
    }
  }
  function failure(error){
    return {
      type: API_REQUEST_FAILURE,
      error: error
    }
  }
  function request(){
    return {
      type: API_REQUEST
    }
  }
}

export function loadListDiagram() {
  return (dispatch, getState) => {
    dispatch(request());
    fakeService.listDiagram().then(data=>{
      dispatch(success(data));
    }).catch(err=>{
      dispatch(failure());
    });
  }
  function request() {
    return {
      type: LIST_DIAGRAM_REQUEST
    };
  }
  function success(data) {
    return {
      type: LIST_DIAGRAM_SUCCESS,
      data: fromJS(data)
    };
  }
  function failure(err) {
    return {
      type: LIST_DIAGRAM_FAILURE,
      err: err
    };
  }
}