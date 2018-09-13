import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {Redirect} from 'react-router-dom';
import { Panel } from "react-bootstrap";
import  LoginForm  from "./LoginForm";
import CenterScreen from "./CenterScreen";

/* eslint-disable react/prefer-stateless-function */
export default class LoginPage extends React.Component {
  render() {
    const state =this.props.location.state;
    const referer = state ? state.referer : "/";
    return (
      <CenterScreen width="500" height="400">
        {this.props.login && <Redirect to={referer}/>}
        <Panel>
          <Panel.Heading> <Panel.Title>Login</Panel.Title> </Panel.Heading>
          <Panel.Body>
            <LoginForm onSubmit={this.props.handleSubmit} onSubmitSuccess={this.props.handleSubmitSuccess}/>
            {this.props.requestStatus.request && <h2>Loading...</h2>}
          </Panel.Body>
        </Panel>
      </CenterScreen>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};