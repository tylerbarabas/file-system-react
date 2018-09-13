import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import FolderIcon from 'images/folder-icon.png';
import FileIcon from 'images/file-icon.png';

const FileViewer = (props) => {
  let files = [];
  for (let i=0;i<props.files.length;i+=1){
    files.push(
      <div className="file" key={i}>
        <img src={FileIcon} />
        {props.files[i]}
      </div>
    );
  }

  let directories = [];
  for (let i=0;i<props.directories.length;i+=1){
    directories.push(
      <div className="directory" key={i}>
        <img src={FolderIcon} />
        {props.directories[i]}
      </div>
    );
  }

  return (
    <section className="file-viewer centered">
      {directories}
      {files}
    </section>
  );
};

FileViewer.propTypes = {
    fileSystemData: PropTypes.any
};

export default FileViewer;
