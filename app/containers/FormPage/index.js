/**
 *
 * FormPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectFormPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import RenderField from '../../components/RenderField';
import FormA from './FormA';

/* eslint-disable react/prefer-stateless-function */
export class FormPage extends React.Component {
  render() {
    return (
      <div className="container">
        <Helmet>
          <title>FormPage</title>
          <meta name="description" content="Description of FormPage" />
        </Helmet>
        <div className="row">
          <div className="col-xs-12">
            <FormA />
          </div>
        </div>
      </div>
    );
  }
}

FormPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  formpage: makeSelectFormPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'formPage', reducer });
const withSaga = injectSaga({ key: 'formPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FormPage);
