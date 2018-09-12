/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.get('home', initialState);

const makeSelectUsername = () =>
  createSelector(selectHome, homeState => homeState.get('username'));

const makeSelectLoading = () => 
  createSelector(selectHome, (home)=> home.get("_loading"));

const makeSelectSuccess = () => 
  createSelector(selectHome, (home)=> home.get("_success"));

const makeSelectData = () => createSelector(selectHome, (home) => home.get("data")); 

const makeSelectError = () => createSelector(selectHome, home => home.get("_error"));


export { selectHome, makeSelectUsername, makeSelectLoading, makeSelectSuccess, makeSelectData, makeSelectError };
