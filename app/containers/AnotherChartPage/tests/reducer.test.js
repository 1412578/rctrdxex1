import { fromJS } from 'immutable';
import anotherChartPageReducer from '../reducer';

describe('anotherChartPageReducer', () => {
  it('returns the initial state', () => {
    expect(anotherChartPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
