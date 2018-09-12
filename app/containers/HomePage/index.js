/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { makeSelectSuccess, makeSelectLoading, makeSelectData, makeSelectError } from './selectors';
import Button from 'components/Button';
import {submit} from './actions'

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  /**
   * when initial state username is not null, submit the form to load repos
   */

  render() {
    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div>
          Homepage
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  _loading: PropTypes.bool,
  _success: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    handleLoading: () => dispatch(submit())
  };
}

const mapStateToProps = (state) => {
  return {
    _loading: makeSelectLoading()(state),
    _success: makeSelectSuccess()(state),
    _error: makeSelectError()(state),
    data: makeSelectData()(state)
  }
} 
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// !! injectReducer RETURN a HOC
// this HOC will return -> an injector, injector -> injector get store from context and inject at componentWillMount
// -> inject by calling getInjector(context.store).injectReducer
// injectReducer will add reducer to store.injectedReducers registry
// this process occurs at the first time loading
// but reducers is injected at componentWillMount
// note: the usage of HOC this time to use componentWillMount
const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });
// withReducer, withSaga, withConnect are all HOC, is composed before passing component in.
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
