/**
 *
 * MapPage
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
import makeSelectMapPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import MapDiv from './MapDiv';
import loadGoogleMapsApi from 'load-google-maps-api';
import _ from 'lodash';

/* eslint-disable react/prefer-stateless-function */
const getCurrentPos = ()=>{
  return new Promise((resolve, reject) =>{
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
export class MapPage extends React.Component {
  constructor (props) {
    super(props)
    this.mapDiv = React.createRef();
    this.map = null;
    this.googleMaps = null;
  }
  componentDidMount () {
    loadGoogleMapsApi({
      key: 'AIzaSyBhig48PW7auixlDL8IoM18INs4qeipA8Q'
    })
    .then((googleMaps) => {
      this.googleMaps = googleMaps;
      this.map = new googleMaps.Map(this.mapDiv.current, {
        position: {
          lat: 10,
          lng: 10,
        },
        zoom: 12,
      });
      this.geocoder = new googleMaps.Geocoder();
      return getCurrentPos();
    })
    .then(data => {
      this.map.setCenter({lat: data.coords.latitude, lng: data.coords.longitude});
    })
    .catch(error => console.log(error));
  }
  addRandomMarker = () => {
    const lat = Math.round(Math.random() * 240) - 120;
    const lng = Math.round(Math.random() * 240) - 120;
    new this.googleMaps.Marker({position: {lat, lng}, map: this.map});
  }
  handleClick = () =>{
    this.geocoder.geocode({'address': '170 Quoc lo 1A'}, (results, status)=>{
      _.range(200).forEach(()=>this.addRandomMarker());
      
    });
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>MapPage</title>
          <meta name="description" content="Description of MapPage" />
        </Helmet>
        <div style={{width: 600, height: 600}} id="map" className="map" ref={this.mapDiv}></div>
        <button onClick={this.handleClick}>Add marker</button>
      </div>
    );
  }
}

MapPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mappage: makeSelectMapPage(),
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

const withReducer = injectReducer({ key: 'mapPage', reducer });
const withSaga = injectSaga({ key: 'mapPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MapPage);
