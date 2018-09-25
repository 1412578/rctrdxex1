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
import {Pie} from 'react-chartjs';

const data = [
  {
		value: 300,
		color:"#F7464A",
		highlight: "#FF5A5E",
		label: "Red"
	},
	{
		value: 50,
		color: "#46BFBD",
		highlight: "#5AD3D1",
		label: "Green"
	},
	{
		value: 100,
		color: "#FDB45C",
		highlight: "#FFC870",
		label: "Yellow"
	}
]
/* eslint-disable react/prefer-stateless-function */
export class AnotherChartPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>AnotherChartPage</title>
          <meta name="description" content="Description of AnotherChartPage" />
        </Helmet>
       <Pie data={data} /> 
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
