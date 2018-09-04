import React from 'react';
import PropTypes from 'prop-types';
import './TaskCard.css';

const TaskCard = props => {

  // noinspection HtmlUnknownAttribute
  return (
    <div data-storyid={props.storyId} id={props.task.id} className={'task-card'} draggable={true} onDragStart={props.onDragStart}>
      <div data-storyid={props.storyId} className={'title'}>{props.task.title}</div>
    </div>
  );

};

TaskCard.propTypes = {
  storyId: PropTypes.string.isRequired,
  task: PropTypes.shape({ title: PropTypes.string.isRequired }).isRequired,
  onDragStart: PropTypes.func.isRequired,
};

export default TaskCard;
