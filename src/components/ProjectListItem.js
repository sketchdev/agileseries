import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProjectListItem = props => {
  return (
    <div className={'project-listitem'}>
      <div className={'name'}>{props.name}</div>
      <div className={'company'}>{props.company}</div>
      <div className={'footer'}>
        <Link to={`/project/edit/${props.id}`}>Edit</Link>
        <Link className={'danger'} to={`/project/delete/${props.id}`}>Delete</Link>
      </div>
    </div>
  );
};

ProjectListItem.propTypes = {
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
};

export default ProjectListItem;
