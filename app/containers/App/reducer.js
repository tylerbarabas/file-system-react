/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOAD_WORKINGPATH,
  LOAD_WORKINGPATH_SUCCESS,
  LOAD_WORKINGPATH_ERROR
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  fileSystemData: {}
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_WORKINGPATH:
      return state
        .set('loading', true)
        .set('error', false)
        .set('fileSystemData', false);
    case LOAD_WORKINGPATH_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('fileSystemData', action.data);
    case LOAD_WORKINGPATH_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
