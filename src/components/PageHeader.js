import React from 'react';
import PropTypes from 'prop-types';

const PageHeader = props => {
  return (
    <div className={'page-header'}>
      <h1>{props.title}</h1>
      {props.children ? (
        <div>{props.children}</div>
      ) : null}
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageHeader;
