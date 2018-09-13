import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the form state domain
 */

const selectLoginPageDomain = state => state.get('loginPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Form
 */

const makeSelectForm = () =>
  createSelector(selectLoginPageDomain, substate => substate.toJS());
const makeSelectRequest = createSelector(selectLoginPageDomain, substate => {
  return {
    request: substate.get("request"),
    success: substate.get("success")
  }
});
export default makeSelectForm;
export { makeSelectRequest };
