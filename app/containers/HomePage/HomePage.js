/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ReposList from 'components/ReposList';
import FileViewer from 'components/FileViewer';
import './style.scss';

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.changeWorkingPath('/');
    this.props.loadWorkingPath('/');
  }

  render() {
    let { workingPath, fileSystemData } = this.props;
    if (!fileSystemData.hasOwnProperty('files')) {
      fileSystemData = {
        files: [],
        directories: []
      };
    }

    return (
      <article>
        <Helmet>
          <title>File System</title>
        </Helmet>
        <div className="home-page">
          <section className="top-bar centered">
            Working path: {workingPath}
          </section>
          <FileViewer className="file-viewer" files={fileSystemData.files} directories={fileSystemData.directories}/>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
};
