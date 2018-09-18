/**
 *
 * ChartPage
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
import makeSelectChartPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {LineChart} from 'react-d3-basic';
import {Chart} from 'react-d3-core';

const data = [ 
 {
   id: 1,
   quantity: 10,
   year: 2006,
 },
 {
   id: 2,
   quantity: 60,
   year: 2008
 }, 
 {
   id: 3,
   quantity: 30,
   year: 2012,
 },
 {
   id: 4,
   quantity: 40,
   year: 2016,
 },
]
var chartSeries = [
  {
    field: 'quantity',
    name: 'quantity',
    color: '#ff7f0e',
    style: {
      "stroke-width": 2,
      "stroke-opacity": .2,
      "fill-opacity": .2
    }
  }
],
x = function(d) {
  return d.id;
}
/* eslint-disable react/prefer-stateless-function */
export class ChartPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>ChartPage</title>
          <meta name="description" content="Description of ChartPage" />
        </Helmet>
        <a>chart</a>
      </div>
    );
  }
}

ChartPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  chartpage: makeSelectChartPage(),
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

const withReducer = injectReducer({ key: 'chartPage', reducer });
const withSaga = injectSaga({ key: 'chartPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ChartPage);
