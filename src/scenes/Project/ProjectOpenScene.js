import React, { Component } from 'react';
import ProjectOpen from '../../components/ProjectOpen';

class ProjectOpenScene extends Component {

  render() {
    const { data: project } = this.props.lookup[0];
    const { data: releases } = this.props.lookup[1];
    return <ProjectOpen project={project} releases={releases}/>;
  }

}

export default ProjectOpenScene;
