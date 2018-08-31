import React, { Component } from 'react';

class UnexpectedScene extends Component {
  render() {
    return <div>{this.props.message || "Well, that was unexpected."}</div>;
  }
}

export default UnexpectedScene;
