import React, { Component } from 'react';
import ProjectOpen from '../../components/Project/ProjectOpen';

class ProjectOpenScene extends Component {

  constructor(props) {
    super(props);
    this.state = { activeTab: 'releases' }
  }

  handleTabChange = (activeTab) => {
    this.setState({ activeTab });
  };

  render() {
    const { data: project } = this.props.lookup[0];
    const { data: releases } = this.props.lookup[1];
    const { data: backlogs } = this.props.lookup[2];
    return <ProjectOpen project={project} releases={releases} backlogs={backlogs} activeTab={this.state.activeTab} onTabChanged={this.handleTabChange}/>;
  }

}

export default ProjectOpenScene;
