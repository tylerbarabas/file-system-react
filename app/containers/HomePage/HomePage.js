/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ReposList from 'components/ReposList';
import './style.scss';

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.changeWorkingPath('/');
    this.props.loadWorkingPath('/');
  }

  render() {
    const { workingPath } = this.props;

    return (
      <article>
        <Helmet>
          <title>File System</title>
        </Helmet>
        <div className="home-page">
          <section className="top-bar centered">
            Working path: {workingPath}
          </section>
          <section className="file-viewer centered">
          </section>
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
