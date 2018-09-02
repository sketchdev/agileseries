import React from 'react';
import PropTypes from 'prop-types';
import './EmptyList.css';

const EmptyList = props => {
  return (
    <div className={'empty-list'}>
      <div className={'title'}>{props.title}</div>
      <div className={'subtitle'}>{props.subtitle}</div>
      {props.button}
    </div>
  );
};

EmptyList.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  button: PropTypes.element.isRequired,
};

export default EmptyList;
