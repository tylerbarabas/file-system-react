/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectWorkingPath = (state) => state.get('home');

const makeSelectWorkingPath = () => createSelector(
  selectWorkingPath,
  (homeState) => homeState.get('workingPath')
);

export {
  selectWorkingPath,
  makeSelectWorkingPath,
};
