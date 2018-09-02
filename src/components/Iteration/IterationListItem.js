import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './IterationListItem.css';

const IterationListItem = props => {
  return (
    <div className={'iteration-listitem'}>
      <Link className={'body'} to={`/iterations/${props.id}/open`}>
        <div className={'name'}>{props.name}</div>
        <div className={'company'}>{props.notes}</div>
      </Link>
      <div className={'footer'}>
        <Link to={`/iterations/${props.id}/edit`}>Edit</Link>
        <Link className={'danger'} to={`/iterations/${props.id}/delete`}>Delete</Link>
      </div>
    </div>
  );
};

IterationListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  notes: PropTypes.string,
};

export default IterationListItem;
