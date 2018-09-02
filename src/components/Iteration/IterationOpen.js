import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EmptyList from '../Page/EmptyList';
import PageHeader from '../Page/PageHeader';
import PageBack from '../Page/PageBack';

const IterationOpen = props => {
  const details = { project: props.project.name, release: props.release.name };
  const linkState = { iterationId: props.iteration.id };
  const createStoryButton = <Link className={'button -primary'} to={{ pathname: '/stories/new', state: linkState }}>Create a story</Link>;
  if (!props.stories || props.stories.length === 0) {
    const title = "No stories for this release.";
    const subtitle = "Let's plan one so you can get started.";
    return (
      <div>
        <PageBack to={`/iterations/${props.iteration.id}/open`} title={'Iterations'}/>
        <PageHeader title={props.iteration.name || ''} details={details}/>
        <EmptyList title={title} subtitle={subtitle} button={createStoryButton}/>
      </div>
    );
  }
  return (
    <div>
      <PageBack to={`/iterations/${props.release.projectId}/open`} title={'Iterations'}/>
      <PageHeader title={props.iteration.name || ''} details={details}>{createStoryButton}</PageHeader>
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
