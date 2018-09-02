import React from 'react';
import PropTypes from 'prop-types';
import './BaseError.css';

const BaseError = props => {
  if (props.errors.base) {
    return <div className={'base-error'}>{props.errors.base}</div>
  }
  return null;
};

BaseError.propTypes = {
  errors: PropTypes.object,
};

export default BaseError;
