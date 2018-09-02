import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PageBack = props => {
  return (
    <div className={'page-back'}>
      <Link to={props.to}>❮ {props.title}</Link>
    </div>
  );
};

PageBack.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default PageBack;
