import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {Redirect} from 'react-router-dom';
import { Panel } from "react-bootstrap";
import  LoginForm  from "./LoginForm";
import CenterScreen from "./CenterScreen";
import LoadingIndicator from "./LoadingIndicator";

/* eslint-disable react/prefer-stateless-function */
export default class LoginPage extends React.Component {
  render() {
    const state =this.props.location.state;
    const referer = state ? state.referer : "/";
    const loading = this.props.requestStatus.request;
    const loadingStyle = loading ? "loading" : "";
    return (
      <CenterScreen>
        {this.props.login && <Redirect to={referer}/>}
        <Panel bsStyle="primary">
          <Panel.Heading> 
            <Panel.Title>Login</Panel.Title>
            <LoadingIndicator className={loadingStyle} />
          </Panel.Heading>
          <Panel.Body>
            <LoginForm onSubmit={this.props.handleSubmit} onSubmitSuccess={this.props.handleSubmitSuccess}/>
          </Panel.Body>
        </Panel>
      </CenterScreen>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};