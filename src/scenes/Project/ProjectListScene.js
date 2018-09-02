import React  from 'react';
import ProjectList from '../../components/Project/ProjectList';

const ProjectListScene = (props) => {
  const { data: projects } = props.lookup;
  return <ProjectList projects={projects}/>;
};

export default ProjectListScene;
