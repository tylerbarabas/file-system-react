/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_REPOS, LOAD_WORKINGPATH } from 'containers/App/constants';
import { workingPathLoaded, workingPathLoadingError, reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername, makeSelectWorkingPath } from 'containers/HomePage/selectors';

export function* getFiles( action ){
  const workingPath = yield select(makeSelectWorkingPath);
  const requestURL = `/file-system?path=${action.path}`;
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      path: action.path
    })
  };

  try {
    const files = yield call(request, requestURL, options);
    yield put(workingPathLoaded(files, workingPath)); 
  } catch (err) {
    yield put(workingPathLoadingError(err));
  }
}

export default function* fileData(){
  yield takeLatest(LOAD_WORKINGPATH, getFiles);
}

/**
 * Github repos request/response handler
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}
 */

/**
 * Root saga manages watcher lifecycle
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_REPOS, getRepos);
}
 */
