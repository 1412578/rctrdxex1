import { fromJS } from 'immutable';
import chartPageReducer from '../reducer';

describe('chartPageReducer', () => {
  it('returns the initial state', () => {
    expect(chartPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
