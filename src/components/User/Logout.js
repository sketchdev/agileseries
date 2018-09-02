import React from 'react';
import { Redirect } from 'react-router-dom';
import API from '../../lib/API';

const Logout = () => {
  API.signout();
  return <Redirect to={'/login'}/>
};

export default Logout;
