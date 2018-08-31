import React from 'react';
import PropTypes from 'prop-types';

const EmptyList = props => {
  return (
    <div>
      <p>{props.title}</p>
      <p>{props.subtitle}</p>
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
