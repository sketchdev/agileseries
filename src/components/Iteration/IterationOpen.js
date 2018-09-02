import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EmptyList from '../Page/EmptyList';
import PageHeader from '../Page/PageHeader';

const IterationOpen = props => {
  const tags = {
    project: { title: props.project.name, to: `/projects/${props.release.projectId}/open` },
    release: { title: props.release.name, to: `/releases/${props.release.id}/open`}
  };
  const linkState = { iterationId: props.iteration.id };
  const createStoryButton = <Link className={'button -primary'} to={{ pathname: '/stories/new', state: linkState }}>Create a story</Link>;
  const backlogButton = <Link className={'button -primary'} to={{ pathname: '/backlog/grab', state: linkState }}>Grab stories from a backlog</Link>;
  if (!props.stories || props.stories.length === 0) {
    return (
      <div>
        <PageHeader title={props.iteration.name || ''} tags={tags}/>
        <EmptyList title={'No stories for this release.'} subtitle={"Let's plan one so you can get started."} buttons={[createStoryButton, backlogButton]}/>
      </div>
    );
  }
  return (
    <div>
      <PageHeader title={props.iteration.name || ''} tags={tags}>{createStoryButton}</PageHeader>
      {/*<StoryList stories={props.stories} />*/}
    </div>
  );
};

IterationOpen.propTypes = {
  stories: PropTypes.array,
  iteration: PropTypes.object.isRequired,
  release: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
};

export default IterationOpen;
