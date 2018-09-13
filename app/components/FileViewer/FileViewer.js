import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const FileViewer = (props) => (
  <div className="list-item-wrapper">
    <li className="list-item">{props.item}</li>
  </div>
);

FileViewer.propTypes = {
  item: PropTypes.any
};

export default FileViewer;
