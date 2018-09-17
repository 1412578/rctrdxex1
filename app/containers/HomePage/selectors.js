/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { select } from 'redux-saga/effects';

const selectHome = state => state.get('home', initialState);

const makeSelectUsername = () =>
  createSelector(selectHome, homeState => homeState.get('username'));

const makeSelectLoading = () => 
  createSelector(selectHome, (home)=> home.get("list-diagram").get("_loading"));

const makeSelectSuccess = () => 
  createSelector(selectHome, (home)=> home.get("_success"));

const makeSelectData = () => createSelector(selectHome, (home) => home.get("data")); 

const makeSelectError = () => createSelector(selectHome, home => home.get("_error"));

const makeSelectListDiagram = () => createSelector(selectHome, home=> home.get("list-diagram").get("data").toJS());


export { selectHome, makeSelectUsername, makeSelectLoading,
       makeSelectSuccess, makeSelectData, makeSelectError,
      makeSelectListDiagram };
