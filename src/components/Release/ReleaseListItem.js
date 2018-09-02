import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ReleaseListItem.css';

const ReleaseListItem = props => {
  return (
    <div className={'release-listitem'}>
      <Link className={'body'} to={`/releases/${props.id}/open`}>
        <div className={'name'}>{props.name}</div>
        <div className={'company'}>{props.notes}</div>
      </Link>
      <div className={'footer'}>
        <Link to={`/releases/${props.id}/edit`}>Edit</Link>
        <Link className={'danger'} to={`/releases/${props.id}/delete`}>Delete</Link>
      </div>
    </div>
  );
};

ReleaseListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  notes: PropTypes.string,
};

export default ReleaseListItem;
