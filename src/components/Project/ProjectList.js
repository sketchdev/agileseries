import React from 'react';
import PropTypes from 'prop-types';
import ProjectListItem from './ProjectListItem';
import { Link } from 'react-router-dom';
import PageHeader from '../Page/PageHeader';
import EmptyList from '../Page/EmptyList';

const ProjectList = props => {
  if (props.projects.length === 0) {
    const createButton = <Link className={'button -primary'} to={'/projects/new'}>Create a project</Link>;
    return (
      <div>
        <PageHeader title={'Projects'}/>
        <EmptyList title={'No projects found'} subtitle={'Would you like to create one now?'} buttons={[createButton]}/>
      </div>
    );
  }
  return (
    <div>
      <PageHeader title={'Projects'}>
        <Link className={'button -primary'} to={'/projects/new'}>Create a project</Link>
      </PageHeader>
      {props.projects.map(project => <ProjectListItem key={project.id} id={project.id} name={project.name} company={project.company}/>)}
    </div>
  );
};

ProjectList.propTypes = {
  projects: PropTypes.array.isRequired,
};

export default ProjectList;
