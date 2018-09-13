/**
 *
 * Form
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import makeSelectForm, { makeSelectRequest } from './selectors';
import reducer from './reducer';
import LoginPage from './LoginPage';
import {submit} from './actions';
import {login} from 'containers/App/actions';
import {loginRequest} from './actions';
import { makeSelectLogin } from 'containers/App/selectors';
import { SubmissionError }  from 'redux-form/immutable';
import {submit as submitForm} from 'redux-form'

const mapStateToProps = (state) => ({
  login: makeSelectLogin()(state),
  requestStatus: makeSelectRequest(state)
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    handleSubmitSuccess: (data)=>{
      console.log("submit success");
    },
    handleSubmit: (data) => {
      console.log("handleSubmit");
      
      // async validate here... 
      // this handle is only called when synchError is empty
      // when use redux-thunk, it bypass this handle because api request is in thunk
    },
    handleSubmitSuccess: (result) =>{
    },
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(LoginPage);
