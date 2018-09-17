import { fromJS } from 'immutable';
import diagramConstructPageReducer from '../reducer';

describe('diagramConstructPageReducer', () => {
  it('returns the initial state', () => {
    expect(diagramConstructPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
