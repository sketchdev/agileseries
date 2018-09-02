import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// TODO: DO SOMETHING HELPFUL

class NotFound extends Component {
  render() {
    return (
      <div>
        <h1>Oops!</h1>
        <p>This page wasn't found.</p>
        <Link to={'/'}>Get back on track</Link>
      </div>
    );
  }
}

export default NotFound;
