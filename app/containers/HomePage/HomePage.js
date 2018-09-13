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
import upIcon from 'images/up-icon.png';
import './style.scss';

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.loadPath();
  }

  onItemClicked(e){
    let all = e.currentTarget.parentNode.children;
    for (let i=0;i<all.length;i+=1) {
      all[i].className = all[i].className.split(' selected')[0];
    }
    e.currentTarget.className += ' selected';
  }

  onItemDblClicked(e){
    let type = e.currentTarget.className.split(' selected')[0];
    let newPath = `${this.props.workingPath}/${e.currentTarget.innerText}`;
    if (newPath.substr(0,2) === '//') newPath = newPath.substr(1,newPath.length-1);
    if (newPath.substr(0,1) !== '/') newPath = '/'+newPath;
    if (type === 'directory') this.loadPath( newPath );
  }

  loadPath( path = '/' ) {
    this.props.changeWorkingPath( path );
    this.props.loadWorkingPath( path );
  }

  upButtonClicked(){
    let newPath = '/';
    let arr = this.props.workingPath.split('/');
    arr.shift();
    if (arr.length > 1) {
      arr.pop();
      newPath = arr.join('/');
    }
    if (newPath.substr(0) !== '/') newPath = `/${newPath}`;
    this.loadPath( newPath );
  }

  render() {
    let { workingPath, fileSystemData } = this.props;
    if (!fileSystemData.hasOwnProperty('files')) {
      fileSystemData = {
        files: [],
        directories: []
      };
    }

    let hidden  = (workingPath === '/')?'hidden':'';

    return (
      <article>
        <Helmet>
          <title>File System</title>
        </Helmet>
        <div className="home-page">
          <section className="top-bar centered">
            Working path: {workingPath}
            <div className={'up-button ' + hidden} onClick={this.upButtonClicked.bind(this)}>
              <img src={upIcon} />
            </div>
          </section>
          <FileViewer className="file-viewer" files={fileSystemData.files} directories={fileSystemData.directories} click={this.onItemClicked.bind(this)} dblClick={this.onItemDblClicked.bind(this)} />
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
