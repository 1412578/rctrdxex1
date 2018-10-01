/**
 *
 * MapPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
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
import FullBodyDiv from './FullBodyDiv';
import MarkersPanel from './MarkersPanel';
import MapLens from './MapLens';
import {showMarkersPanel, selectMarker,
        leaveMarker, moveLens} from './actions';
import Markers from './Markers'; 
import {getCurrentPos, fromPixelToLatLng, point2LatLng} from './utils';

/* eslint-disable react/prefer-stateless-function */
export class MapPage extends React.Component {
  constructor (props) {
    super(props)
    this.mapDiv = React.createRef();
    this.mapZoomDiv = React.createRef();
    this.map = null;
    this.mapZoom = null;
    this.googleMaps = null;
    this.markerPos = {lat: 0, lng: 0};
    this.markers = [];
    this.polyline = null;
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

      this.mapZoom = new googleMaps.Map(this.mapZoomDiv.current, {
        position: {
          lat: 10,
          lng: 10,
        },
        zoom: 5,
      });
      
      this.polyline = new this.googleMaps.Polyline({
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      this.geocoder = new googleMaps.Geocoder();

      return getCurrentPos();
    })
    .then(data => {
      this.map.setCenter({lat: data.coords.latitude, lng: data.coords.longitude});
      this.mapZoom.setCenter({lat: data.coords.latitude, lng: data.coords.longitude});
      this.googleMaps.event.addDomListener(this.mapDiv.current, 'mouseup', (e)=>{
        if (this.props.mappage.isMarkerSelecting){

          const icon = Markers.find(
            marker => marker.id === this.props.mappage.markerSelected
          );

          // from offsetX, offsetY of mouse to lattidue, longitude
          const latLng = point2LatLng({
            x: e.offsetX,
            y: e.offsetY
          }, this.map, this.googleMaps);

          this.addMarker({
            lat: latLng.lat(),
            lng: latLng.lng()
          }, icon);

          this.markers.push({lat: latLng.lat(), lng: latLng.lng()});
          this.polyline.setPath(this.markers);
          this.polyline.setMap(this.map);

          this.props.dispatch(leaveMarker());
        }
      });

      this.map.addListener("mousemove", ({latLng, pixel})=>{
        this.props.dispatch(moveLens(pixel.x, pixel.y));        
      });
      
    })
    .catch(error => console.log(error));
  }

  addMarker = ({lat, lng}, icon) => {
    new this.googleMaps.Marker({
      position: {
        lat, 
        lng
      }, 
      map: this.map,
      icon: {
        scaledSize: new this.googleMaps.Size(25, 25),
        url: icon.url,
      }
    }); 
  }

  handleClick = (e) =>{
    switch (e.target.id) {
      case "add-marker":
        this.props.showMarkersPanel();
        break;
      case "get-current-position":
        const a = null;
        getCurrentPos().then(position => {
          this.map.setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            });
          this.map.setZoom(12);
        });
        break;
    }
  }
  render() {
    return (
      <FullBodyDiv className="map-layout">
        <Helmet>
          <title>MapPage</title>
          <meta name="description" content="Description of MapPage" />
        </Helmet>
        <div className="sidebar">
          <div className="map-zoom" ref={this.mapZoomDiv}>
          </div>
          <h5>Want to do something ?</h5>
          <button
            onClick={this.handleClick}
            id="add-marker"
            className="btn-map">
            Add marker
          </button>
          <MarkersPanel 
            show={this.props.mappage.showMarkersPanel}
            markers={Markers}
            onStart={this.props.selectMarker}/>
          <button
            onClick={this.handleClick}
            id="get-current-position"
            className="btn-map">
            Get current position 
          </button>
          <button
            onClick={this.handleClick}
            id="others"
            className="btn-map">
            Others
          </button>
        </div> 
        <div className="map-wrapper">
          {!this.props.mappage.isMarkerSelecting &&
            <MapLens
              top={this.props.mappage["lens-y"]}
              left={this.props.mappage["lens-x"]}
              width={150}
              height={150}
            /> 
          }
        <MapDiv id="map" className="map" innerRef={this.mapDiv}>
        </MapDiv>
        </div>
      </FullBodyDiv>
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
    loadMap: () =>{
      dispatch(loadMap("AIzaSyBhig48PW7auixlDL8IoM18INs4qeipA8Q"));
    },
    showMarkersPanel: () =>{
      dispatch(showMarkersPanel());
    },
    selectMarker: (e) => {
      dispatch(selectMarker(e.target.id));
    },
    leaveMarker: () => {
      dispatch(leaveMarker());
    },
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
