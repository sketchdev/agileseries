import React, { Component } from 'react';
import API from '../../lib/API';
import { NavLink } from 'react-router-dom';

class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: null,
    }
  }

  async componentWillMount() {
    const jwt = await API.isAuthenticated();
    if (jwt) {
      const { email } = jwt;
      this.setState({ email });
    }
  }

  render() {
    if (this.state.email) {
      return (
        <nav>
          <ul>
            <li>{this.state.email}</li>
            <li><NavLink to={'/projects'}>Projects</NavLink></li>
            <li><NavLink to={'/logout'}>Log out</NavLink></li>
          </ul>
        </nav>
      );
    }
    return (
      <nav>
        <ul>
          <li><NavLink to={'/login'}>Log in</NavLink></li>
        </ul>
      </nav>
    );
  }

}

export default Navigation;
