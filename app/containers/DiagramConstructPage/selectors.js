import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the diagramConstructPage state domain
 */

const selectDiagramConstructPageDomain = state =>
  state.get('diagramConstructPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by DiagramConstructPage
 */

const makeSelectDiagramConstructPage = () =>
  createSelector(selectDiagramConstructPageDomain, substate => substate.toJS());

const makeSelectDiagram = createSelector(selectDiagramConstructPageDomain, domain => domain.data.toJS())

export default makeSelectDiagramConstructPage;
export { selectDiagramConstructPageDomain };
