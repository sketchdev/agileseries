import React from 'react';
import IterationOpen from '../../components/Iteration/IterationOpen';
import API from '../../lib/API';

class IterationOpenScene extends React.Component {

  handleTaskStateChange = async (storyId, id, taskState) => {
    // TODO: show progress
    // TODO: confirm save
    // TODO: handle errors
    await API.updateTask({ storyId, id, state: taskState });
  };

  render() {
    const { data: iteration } = this.props.lookup[0];
    const { data: release } = this.props.lookup[1];
    const { data: project } = this.props.lookup[2];
    const { data: stories } = this.props.lookup[3];
    return <IterationOpen project={project} release={release} iteration={iteration} stories={stories} onTaskStateChange={this.handleTaskStateChange}/>;
  }

}

export default IterationOpenScene;
