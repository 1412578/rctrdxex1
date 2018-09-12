import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {Redirect} from 'react-router-dom';
import { Panel } from "react-bootstrap";
import  LoginForm  from "./LoginForm";

/* eslint-disable react/prefer-stateless-function */
export default class LoginPage extends React.Component {
  render() {
    const state =this.props.location.state;
    const referer = state ? state.referer : "/";
    return (
      <section>
        {this.props.login && <Redirect to={referer}/>}
        <Panel>
          <Panel.Heading> <Panel.Title>Login</Panel.Title> </Panel.Heading>
          <Panel.Body>
            <LoginForm onSubmit={this.props.handleSubmit}/>
          </Panel.Body>
        </Panel>
      </section>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};