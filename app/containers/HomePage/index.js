import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectFileSystemData,
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError
} from 'containers/App/selectors';
import { loadRepos, loadWorkingPath } from '../App/actions';
import { changeWorkingPath } from './actions';
import { makeSelectWorkingPath } from './selectors';
import reducer from './reducer';
import saga from './saga';
import HomePage from './HomePage';

const mapDispatchToProps = (dispatch) => ({
  changeWorkingPath: (path) => dispatch(changeWorkingPath(path)),
  loadWorkingPath: (path) => dispatch(loadWorkingPath(path))
});

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  workingPath: makeSelectWorkingPath(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  fileSystemData: makeSelectFileSystemData(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
export { mapDispatchToProps };
