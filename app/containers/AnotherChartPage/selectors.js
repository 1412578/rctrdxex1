import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the anotherChartPage state domain
 */

const selectAnotherChartPageDomain = state =>
  state.get('anotherChartPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AnotherChartPage
 */

const makeSelectAnotherChartPage = () =>
  createSelector(selectAnotherChartPageDomain, substate => substate.toJS());

export default makeSelectAnotherChartPage;
export { selectAnotherChartPageDomain };
