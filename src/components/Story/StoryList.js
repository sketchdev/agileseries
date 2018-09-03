import React from 'react';
import PropTypes from 'prop-types';
import StoryListItem from './StoryListItem';

const StoryList = props => {
  return (
    <div>
      {props.stories.map(story => <StoryListItem key={story.id} id={story.id} title={story.title} points={story.points} notes={story.notes}/>)}
    </div>
  );
};

StoryList.propTypes = {
  stories: PropTypes.array.isRequired,
};

export default StoryList;
