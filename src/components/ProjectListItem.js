import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProjectListItem = props => {
  return (
    <div className={'project-listitem'}>
      <div className={'name'}>{props.name}</div>
      <div className={'company'}>{props.company}</div>
      <div className={'footer'}>
        <Link to={`/projects/${props.id}/edit`}>Edit</Link>
        <Link className={'danger'} to={`/projects/${props.id}/delete`}>Delete</Link>
      </div>
    </div>
  );
};

ProjectListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
};

export default ProjectListItem;
