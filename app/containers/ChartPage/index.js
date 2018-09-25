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
import { XAxis, YAxis, CartesianGrid, Line, ResponsiveContainer,
       Tooltip, Legend, ComposedChart, Area, Bar, Cell} from "recharts";
import CenterDiv from "./CenterDiv";
import _ from "lodash";

const data = _.range(200).map(i => ({
  id: i,
  quantity: 0,
  year: 2006 + i, 
}));
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
const FPS = 60;
export class ChartPage extends React.Component {
  constructor(props){
    super(props);
    this.chartRef = React.createRef();
    this.state = {data: []};
    this.tick = 0;
  }
  startAnimation = _.throttle(() => {
    this.setState(prevState => {
      const ret = prevState.data.map((d, index) => ({ ...d, quantity: Math.ceil(Math.random() * 1500)}));
      this.tick++;
      return ({ data: ret});
    });
    requestAnimationFrame(this.startAnimation);
  }, 1000 / FPS)
  componentDidMount () {
    this.setState({data: data});
    requestAnimationFrame(this.startAnimation);
  }
  replaceChar = (char, str) =>{
    const randomIndex = Math.round((str.length - 1) * Math.random());
    return str.slice(0, randomIndex) + char + str.slice(randomIndex+1);
  }
  randomChar = () => {
    return String.fromCharCode(Math.round(Math.random()*26)+64);
  }
  render() {
    const colorBtn = Math.round(Math.random()*360); 
    const text = 'RECHARTJS';
    const textRandom = this.replaceChar(this.randomChar(), text);
    const indexRandom = Math.round(Math.random() * (textRandom.length -1));
    const leftText = textRandom.slice(0, indexRandom);
    const midText = textRandom[indexRandom];
    const rightText = textRandom.slice(indexRandom + 1);
    return (
      <CenterDiv>
        <Helmet>
          <title>ChartPage</title>
          <meta name="description" content="Description of ChartPage" />
        </Helmet>
        <div className="text">
          <div className="left" style={{
            color: `hsl(${colorBtn + 180}, 40%, 70%)`,
            fontSize: `${Math.round(Math.random() *64)}px`,
          }}>{`${leftText}`}</div>
          <div className="mid" style={{
            color: `hsl(${colorBtn + 180}, 40%, 70%)`,
            fontSize: `${Math.round(Math.random() *64)}px`,
          }}>{`${midText}`}</div>
          <div className="right" style={{
            color: `hsl(${colorBtn + 180}, 40%, 70%)`,
            fontSize: `${Math.round(Math.random() *64)}px`,
          }}>{`${rightText}`}</div>
        </div>
        <ResponsiveContainer width="60%" className="v-middle" height={500}>
        <ComposedChart data={this.state.data} margin={{right: 10}}>
            <Line dataKey="quantity" />
            <XAxis dataKey="year"/>
            <YAxis data="quantity" type="number" domain={[0, 2000]} />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="quantiy" fill="#8884d8" stroke="#8884d8" />
            <Bar dataKey="quantity" barSize={20} isAnimationActive={true}>
              {
                data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${Math.round(Math.random() * 360)},50%,50%)`}  />
                ))
              }
            </Bar>
            <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
        </ComposedChart>
        </ResponsiveContainer>
      </CenterDiv>
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
