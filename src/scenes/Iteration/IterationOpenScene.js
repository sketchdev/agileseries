import React from 'react';
import IterationOpen from '../../components/Iteration/IterationOpen';

const IterationOpenScene = (props) => {
  const { data: iteration } = props.lookup[0];
  const { data: release } = props.lookup[1];
  const { data: project } = props.lookup[2];
  const { data: stories } = props.lookup[3];
  return <IterationOpen project={project} release={release} iteration={iteration} stories={stories}/>;
};

export default IterationOpenScene;
