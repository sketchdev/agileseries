import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Progress extends Component {

  render() {
    return <div>{this.props.message || 'Loading, please wait...'}</div>;
  }

}

Progress.propTypes = {
  message: PropTypes.number,
};

export default Progress;
