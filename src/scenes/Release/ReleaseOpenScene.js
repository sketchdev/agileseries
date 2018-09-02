import React from 'react';
import ReleaseOpen from '../../components/Release/ReleaseOpen';

const ReleaseOpenScene = (props) => {
  const { data: release } = props.lookup[0];
  const { data: iterations } = props.lookup[1];
  const { data: project } = props.lookup[2];
  return <ReleaseOpen project={project} release={release} iterations={iterations}/>;
};

export default ReleaseOpenScene;
