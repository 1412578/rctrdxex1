import { fromJS } from 'immutable';
import newDiagramPageReducer from '../reducer';

describe('newDiagramPageReducer', () => {
  it('returns the initial state', () => {
    expect(newDiagramPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
