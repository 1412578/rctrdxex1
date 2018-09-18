import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the chartPage state domain
 */

const selectChartPageDomain = state => state.get('chartPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ChartPage
 */

const makeSelectChartPage = () =>
  createSelector(selectChartPageDomain, substate => substate.toJS());

export default makeSelectChartPage;
export { selectChartPageDomain };
