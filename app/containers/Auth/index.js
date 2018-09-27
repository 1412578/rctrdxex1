/**
 *
 * Auth
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import messages from './messages';
import {Switch, Route, Link, Redirect} from 'react-router-dom';
import {push} from 'react-router-redux';
import {makeSelectLogin} from 'containers/App/selectors';
import {login, logout} from 'containers/App/actions';
import  HomePage  from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import NewDiagramPage from 'containers/NewDiagramPage/Loadable';
import DiagramConstructPage from 'containers/DiagramConstructPage/Loadable'
import ChartPage from 'containers/ChartPage/Loadable';
import AnotherChartPage from 'containers/AnotherChartPage/Loadable';
import MapPage from 'containers/MapPage/Loadable';

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
        <React.Fragment>
          {!this.props.login && <Redirect to={{ pathname: "/login", state: { referer: this.props.location.pathname } }} />}
          <Header handleLogout={this.props.handleLogout} username={username} changeURL={this.props.changeURL}/>
          <Switch>
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/new" component={NewDiagramPage} />
            <Route exact path="/chart" component={ChartPage} />
            <Route exact path="/chart2" component={AnotherChartPage} />
            <Route exact path="/map" component={MapPage} />
            <Route exact path="/diagram/:id" component={DiagramConstructPage} />
            <Route exact path="/" component={HomePage} />
            <Route path="" component={NotFoundPage} />
          </Switch>
        </React.Fragment>
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
    changeURL: (url) => {
      dispatch(push(url));
    },
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
