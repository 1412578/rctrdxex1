/**
 *
 * Form
 *
 */

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import makeSelectForm from './selectors';
import reducer from './reducer';
import LoginPage from './LoginPage';
import {submit} from './actions';
import {login} from 'containers/App/actions';
import { makeSelectLogin } from 'containers/App/selectors';

const mapStateToProps = (state) => ({
  login: makeSelectLogin()(state)
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    handleSubmitSuccess: (data)=>{
      console.log("submit success");
    },
    handleClickLogin: () => {
      dispatch(login())
    }
  };
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
