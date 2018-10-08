import { fromJS } from 'immutable';
import formPageReducer from '../reducer';

describe('formPageReducer', () => {
  it('returns the initial state', () => {
    expect(formPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
