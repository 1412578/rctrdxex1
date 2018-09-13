/**
 *
 * Auth
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import {makeSelectRequest} from './selectors';
import reducer from './reducer';
import messages from './messages';
import {Switch, Route, Link, Redirect} from 'react-router-dom';
import {makeSelectLogin} from 'containers/App/selectors';
import {login, logout} from 'containers/App/actions';
import  HomePage  from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';

/* eslint-disable react/prefer-stateless-function */
export class Auth extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidCatch(error, info){
    console.log(error);
    this.setState({error: true});
  }
  componentDidMount(){
    if (localStorage.getItem("username"))
      this.props.setLogin(localStorage.getItem("username"));
  }
  render() {
      const username = localStorage.getItem("username");
      return (
        <div>
          {!this.props.login && <Redirect to={{ pathname: "/login", state: { referer: this.props.location.pathname } }} />}
          <Header handleLogout={this.props.handleLogout} username={username}/>
          <Switch>
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/" component={HomePage} />
            <Route path="" component={NotFoundPage} />
          </Switch>
        </div>
      );
  }
}

Auth.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  login: makeSelectLogin()(state)
});

function mapDispatchToProps(dispatch) {
  return {
    setLogin: (username) => dispatch(login(username)),
    handleLogout: () => dispatch(logout()),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'auth', reducer });

export default compose(
  withReducer,
  withConnect,
)(Auth);
