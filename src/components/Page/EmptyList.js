import React from 'react';
import PropTypes from 'prop-types';
import './EmptyList.css';

const EmptyList = props => {
  return (
    <div className={'empty-list'}>
      <div className={'title'}>{props.title}</div>
      <div className={'subtitle'}>{props.subtitle}</div>
      {props.buttons.map((button, index) => {
        return (
          <div key={index}>{button}</div>
        )
      })}
    </div>
  );
};

EmptyList.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default EmptyList;
