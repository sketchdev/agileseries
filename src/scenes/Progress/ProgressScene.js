import React, { Component } from 'react';
import './ProgressScene.css';

class ProgressScene extends Component {
  render() {
    return (
      <div className={'page-progress'}>
        {this.props.message || 'Loading, please wait...'}
      </div>
    );
  }
}

export default ProgressScene;
