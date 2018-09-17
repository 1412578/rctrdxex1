import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the newDiagramPage state domain
 */

const selectNewDiagramPageDomain = state =>
  state.get('newDiagramPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by NewDiagramPage
 */

const makeSelectNewDiagramPage = () =>
  createSelector(selectNewDiagramPageDomain, substate => substate.toJS());

export default makeSelectNewDiagramPage;
export { selectNewDiagramPageDomain };
