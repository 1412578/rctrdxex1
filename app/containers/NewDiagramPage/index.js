/**
 *
 * NewDiagramPage
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
import makeSelectNewDiagramPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import NewDiagramForm from './NewDiagramForm';


/* eslint-disable react/prefer-stateless-function */
export class NewDiagramPage extends React.Component {
  render() {
    return (
      <div className="container">
        <Helmet>
          <title>NewDiagramPage</title>
          <meta name="description" content="Description of NewDiagramPage" />
        </Helmet>
        <div className="row">
          <div className="col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h4 className="panel-title">Create new diagram</h4>
              </div>
              <div className="panel-body">
                <NewDiagramForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NewDiagramPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  newdiagrampage: makeSelectNewDiagramPage(),
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

const withReducer = injectReducer({ key: 'newDiagramPage', reducer });
const withSaga = injectSaga({ key: 'newDiagramPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NewDiagramPage);
