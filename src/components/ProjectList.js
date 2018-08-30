import React from 'react';
import PropTypes from 'prop-types';
import ProjectListItem from './ProjectListItem';
import { Link } from 'react-router-dom';

const ProjectList = props => {
  if (props.projects.length === 0) {
    return (
      <div>
        <p>No projects found.</p>
        <p>Would you like to create one now?</p>
        <Link to={'/projects/new'}>Create a project</Link>
      </div>
    )
  }
  return (
    <div>
      {props.projects.map(project => <ProjectListItem key={project.id} id={project.id} name={project.name} company={project.company}/>)}
    </div>
  );
};

ProjectList.propTypes = {
  projects: PropTypes.array.isRequired,
};

export default ProjectList;
