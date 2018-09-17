/**
 *
 * DiagramConstructPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Message } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDiagramConstructPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { fakeService } from 'utils/fakeService';
import {loadDiagram} from './actions';

/* eslint-disable react/prefer-stateless-function */
export class DiagramConstructPage extends React.Component {
  componentDidMount(){
    const match = this.props.match;
    this.props.loadDiagram(match.params.id);
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>DiagramConstructPage</title>
          <meta
            name="description"
            content="Description of DiagramConstructPage"
          />
        </Helmet>
      </div>
    );
  }
}

DiagramConstructPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  diagramconstructpage: makeSelectDiagramConstructPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadDiagram: (id) => dispatch(loadDiagram(id))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'diagramConstructPage', reducer });
const withSaga = injectSaga({ key: 'diagramConstructPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DiagramConstructPage);
