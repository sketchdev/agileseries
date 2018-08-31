import React from 'react';
import ReleaseOpen from '../../components/ReleaseOpen';

const ReleaseOpenSource = (props) => {
  const { data: release } = props.lookup[0];
  const { data: iterations } = props.lookup[1];
  return <ReleaseOpen release={release} iterations={iterations}/>;
};

export default ReleaseOpenSource;
