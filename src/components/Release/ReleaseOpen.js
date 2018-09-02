import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EmptyList from '../Page/EmptyList';
import PageHeader from '../Page/PageHeader';
import IterationList from '../Iteration/IterationList';

const ReleaseOpen = props => {
  const tags = { project: { title: props.project.name, to: `/projects/${props.release.projectId}/open` } };
  const linkState = { releaseId: props.release.id };
  const createIterationButton = <Link className={'button -primary'} to={{ pathname: '/iterations/new', state: linkState }}>Create an iteration</Link>;
  if (!props.iterations || props.iterations.length === 0) {
    const title = "No iterations for this release.";
    const subtitle = "Let's plan one so you can get started.";
    return (
      <div>
        <PageHeader title={props.release.name || ''} tags={tags}/>
        <EmptyList title={title} subtitle={subtitle} button={createIterationButton}/>
      </div>
    );
  }
  return (
    <div>
      <PageHeader title={props.release.name || ''} tags={tags}>{createIterationButton}</PageHeader>
      <IterationList iterations={props.iterations} />
    </div>
  );
};

ReleaseOpen.propTypes = {
  release: PropTypes.object.isRequired,
  iterations: PropTypes.array,
};

export default ReleaseOpen;
