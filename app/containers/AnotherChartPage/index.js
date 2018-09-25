/**
 *
 * AnotherChartPage
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
import makeSelectAnotherChartPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import  Modal  from "react-modal";
/* eslint-disable react/prefer-stateless-function */


export class AnotherChartPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false
    };
  }
  handleClickShowModal = () => {
    this.setState({show: true});
  }
  handleClickHideModal = () => {
    this.setState({show: false});
  } 
  render() {
    return (
      <div>
        <Helmet>
          <title>AnotherChartPage</title>
          <meta name="description" content="Description of AnotherChartPage" />
        </Helmet>
        <button className="show-modal" onClick={this.handleClickShowModal}>Show modal</button>
        <Modal isOpen={this.state.show}>
          <button className="close-modal" onClick={this.handleClickHideModal}>close</button>
          <h1>modal</h1>
        </Modal>
      </div>
    );
  }
}

AnotherChartPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  anotherchartpage: makeSelectAnotherChartPage(),
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

const withReducer = injectReducer({ key: 'anotherChartPage', reducer });
const withSaga = injectSaga({ key: 'anotherChartPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AnotherChartPage);
