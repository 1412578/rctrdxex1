import { fromJS } from "immutable";
import makeSelectMapPage, { selectMapPageDomain } from "../selectors";

// import { fromJS } from 'immutable';
// import { selectMapPageDomain } from '../selectors';

describe('selectMapPageDomain', () => {
  it('should return mapPage', () => {
    const mapPage = fromJS({});
    const mockedState = fromJS({
      mapPage: mapPage,
    });
    expect(selectMapPageDomain(mockedState)).toEqual(mapPage);
  });
});

describe('makeSelectMapPage', () => {
  it('should return mapPage object', () => {
    const mockedState = fromJS({
      mapPage: {name: "test"},
    });
    expect(makeSelectMapPage()(mockedState).name).toEqual("test");
  });
});