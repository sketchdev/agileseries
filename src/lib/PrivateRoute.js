import { Redirect, Route } from 'react-router-dom';
import React from 'react';
import API from './API';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props =>
      API.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
      )
    }
    />
  );
};

export default PrivateRoute;
