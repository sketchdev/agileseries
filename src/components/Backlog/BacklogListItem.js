import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './BacklogListItem.css';

const BacklogListItem = props => {
  return (
    <div className={'backlog-listitem'}>
      <Link className={'body'} to={`/backlogs/${props.id}/open`}>
        <div className={'name'}>{props.name}</div>
        <div className={'company'}>{props.notes}</div>
      </Link>
      <div className={'footer'}>
        <Link to={`/backlogs/${props.id}/edit`}>Edit</Link>
        <Link className={'danger'} to={`/backlogs/${props.id}/delete`}>Delete</Link>
      </div>
    </div>
  );
};

BacklogListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  notes: PropTypes.string,
};

export default BacklogListItem;
