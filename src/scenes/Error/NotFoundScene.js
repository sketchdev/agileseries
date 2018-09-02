import React, { Component } from 'react';

class UnexpectedScene extends Component {
  render() {
    return <div>{this.props.message || "Um, that page does't exist."}</div>;
  }
}

export default UnexpectedScene;
