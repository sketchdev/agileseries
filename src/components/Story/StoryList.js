import React from 'react';
import PropTypes from 'prop-types';
import './StoryList.css';
import TaskCardList from '../Task/TaskCardList';
import { Link } from 'react-router-dom';

class StoryList extends React.Component {

  handleDragStart = (e) => {
    this.dragStoryId = e.target.getAttribute('data-storyid');
    this.dragTaskId = e.target.id;
  };

  handleDragEnd = () => {
    this.dragStoryId = null;
    this.dragTaskId = null;
  };

  handleDragOver = (e) => {
    const targetStoryId = e.target.getAttribute('data-storyid');
    if (targetStoryId === this.dragStoryId) {
      e.preventDefault();
    }
  };

  handleDrop = (e) => {
    e.preventDefault();
    const storyId = this.dragStoryId;
    const id = this.dragTaskId;
    const sourceElement = document.getElementById(id);
    const dropTarget = e.target.closest("[data-droppable]");
    if (dropTarget) {
      const targetStoryId = dropTarget.getAttribute('data-storyid');
      if (targetStoryId === storyId) {
        const taskState = parseInt(dropTarget.getAttribute('data-taskstate'), 10);
        dropTarget.appendChild(sourceElement);
        this.props.onTaskStateChange(storyId, id, taskState);
      }
    }
  };

  render() {
    return (
      <div onDragEnd={this.handleDragEnd}>
        <table className={'story-board'}>
          <thead>
          <tr>
            <th>Story</th>
            <th>Not Started</th>
            <th>In Progress</th>
            <th>Completed</th>
          </tr>
          </thead>
          <tbody>
          {this.props.stories.map(story => {
            return (
              <tr key={story.id}>
                <td>
                  <div>{story.title}</div>
                  <div>
                    <Link to={`/stories/${story.id}/edit`}>Edit</Link>
                    <Link className={'danger'} to={`/stories/${story.id}/delete`}>Delete</Link>
                  </div>
                  <div>
                    <Link className={'button'} to={{ pathname: '/tasks/new', state: { storyId: story.id, iterationId: story.iterationId } }}>Add task »</Link>
                  </div>
                </td>
                <td onDragOver={this.handleDragOver} onDrop={this.handleDrop} data-droppable={'true'} data-taskstate={0} data-storyid={story.id}>
                  <TaskCardList story={story} tasks={(story.tasks || []).filter(task => task.state === 0)} onDragStart={this.handleDragStart}/>
                </td>
                <td onDragOver={this.handleDragOver} onDrop={this.handleDrop} data-droppable={'true'} data-taskstate={1} data-storyid={story.id}>
                  <TaskCardList story={story} tasks={(story.tasks || []).filter(task => task.state === 1)} onDragStart={this.handleDragStart}/>
                </td>
                <td onDragOver={this.handleDragOver} onDrop={this.handleDrop} data-droppable={'true'} data-taskstate={2} data-storyid={story.id}>
                  <TaskCardList story={story} tasks={(story.tasks || []).filter(task => task.state === 2)} onDragStart={this.handleDragStart}/>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    );
  }

}

StoryList.propTypes = {
  stories: PropTypes.array.isRequired,
  onTaskStateChange: PropTypes.func.isRequired,
};

export default StoryList;
