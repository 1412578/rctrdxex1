
/*
 *
 * Form actions
 *
 */

import { DEFAULT_ACTION, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from './constants';
import { fakeService } from 'utils/fakeService';
import { login } from 'containers/app/actions';
import {stopSubmit, setSubmitFailed} from "redux-form";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loginRequest(data){
  return (dispatch, getState)=>{
    dispatch(request()); 
    fakeService.login(data.username, data.password).then((role)=>{
      dispatch(success());
      dispatch(login(data.username));
    })
    .catch(err=>{
      dispatch(failure());
      dispatch(stopSubmit("login-form", {_error: "Login failed", username: "cannot find username"}));
      dispatch(setSubmitFailed("login-form", ["username"])); // set fields has error
    });
  }
  function request(){
    return {
      type: LOGIN_REQUEST
    }
  }
  function success(){
    return {
      type: LOGIN_SUCCESS
    }
  }
  function failure(){
    return {
      type: LOGIN_FAILURE
    }
  }
}