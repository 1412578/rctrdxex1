import React from 'react';
import { shallow, mount } from 'enzyme';

import MapPageContainer, { MapPage } from '../index';
import  configureStore  from "../../../configureStore";
import createHistory from 'history/createBrowserHistory';
import {Provider} from 'react-redux';

describe('<MapPage />', () => { 
  beforeEach(()=>{
  });
  it('MapPage render properly', () => {
    const dispatch = jest.fn();
    const mapPage = shallow(
      <MapPage mappage={{showMarkersPanel: true, isMarkerSelecting: false}} dispatch={dispatch}/>
    );
    expect(mapPage.containsMatchingElement(<h5>Want to do something ?</h5>)).toEqual(true);
    expect(mapPage.find("h5").length).toBe(1);
    expect(dispatch).toBeCalled();
  });
});
