import React from 'react';
import PropTypes from 'prop-types';
import TaskCard from './TaskCard';

const TaskCardList = props => {
  return props.tasks.map(task => <TaskCard key={task.id} storyId={props.story.id} task={task} onDragStart={props.onDragStart}/>);
};

TaskCardList.propTypes = {
  story: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
  tasks: PropTypes.array,
  onDragStart: PropTypes.func.isRequired,
};

export default TaskCardList;
