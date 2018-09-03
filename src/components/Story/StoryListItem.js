import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './StoryListItem.css';

const StoryListItem = props => {
  return (
    <div className={'story-listitem'}>
      <Link className={'body'} to={`/stories/${props.id}/open`}>
        <div className={'title'}>{props.title}</div>
        <div className={'points'}>{props.points}</div>
        <div className={'company'}>{props.notes}</div>
      </Link>
      <div className={'footer'}>
        <Link to={`/stories/${props.id}/edit`}>Edit</Link>
        <Link className={'danger'} to={`/stories/${props.id}/delete`}>Delete</Link>
      </div>
    </div>
  );
};

StoryListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  points: PropTypes.string,
  notes: PropTypes.string,
};

export default StoryListItem;
