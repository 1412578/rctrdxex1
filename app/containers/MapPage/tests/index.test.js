import React from 'react';
import {getCurrentPos} from '../utils';
import { shallow, mount } from 'enzyme';
import { MapPage } from '../index';
import MarkersPanel from '../MarkersPanel';
import MapLens from '../MapLens';

jest.mock('../utils');

describe('<MapPage />', () => { 
  let dispatch;
  let props;
  beforeEach(()=>{
    dispatch = jest.fn();
    props = {
      mappage: {
        showMarkersPanel: false, 
        isMarkerSelecting: false
      },
      dispatch
    };
  });

  it('should render properly', () => {
    const mapPage = shallow( <MapPage {...props}/>);
    expect(mapPage.containsMatchingElement(<h5>Want to do something ?</h5>)).toEqual(true);
  });

  it('should render markers panel when showMarkersPanel = true', () => {
    props.mappage.showMarkersPanel = true;
    const mapPage = shallow(<MapPage {...props}/>);
    expect(mapPage.find(MarkersPanel).dive().find('.markers-panel').length).toBe(1);
  });

  it('should not render markers panel when showMarkersPanel = false', () => {
    props.mappage.showMarkersPanel = false;
    const mapPage = shallow(<MapPage {...props}/>);
    expect(mapPage.find(MarkersPanel).dive().find('.markers-panel').length).toBe(0);
  });

  it('should not render maps lens when isMarkerSelecting = true', () => {
    props.mappage.isMarkerSelecting = true;
    const mapPage = shallow(<MapPage {...props}/>);
    expect(mapPage.find(MapLens).length).toBe(0);
  });

  it('should render maps lens when isMarkerSelecting = false', () => {
    props.mappage.isMarkerSelecting = false;
    const mapPage = shallow(<MapPage {...props}/>);
    expect(mapPage.find(MapLens).length).toBe(1);
  });

  it('should call showMarkersPanel when click add marker', () => {
    const fn = jest.fn();
    props.showMarkersPanel = fn;
    const mapPage = shallow(<MapPage {...props}/>);
    mapPage.find("#add-marker").simulate("click", {
      target: {
        id: "add-marker",
      },
    });
    expect(fn.mock.calls.length).toBe(1);
  });

  it('should  when click add marker', () => {
    getCurrentPos.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({
      coords: {
        lat: 1, 
        lng: 3
      }
    }), 200)));
    const mapPage = shallow(<MapPage {...props}/>);
    mapPage.find("#get-current-position").simulate("click", {
      target: {
        id: "get-current-position",
      },
    });
    expect(getCurrentPos.mock.calls.length).toBe(1);
  });
});
