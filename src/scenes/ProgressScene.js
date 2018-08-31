import React, { Component } from 'react';

class ProgressScene extends Component {
  render() {
    return <div>{this.props.message || 'Loading, please wait...'}</div>;
  }
}

export default ProgressScene;
