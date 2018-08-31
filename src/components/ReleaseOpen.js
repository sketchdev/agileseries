import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EmptyList from './EmptyList';
import PageHeader from './PageHeader';
import PageBack from './PageBack';
import IterationList from './IterationList';

const ReleaseOpen = props => {
  const state = { releaseId: props.release.id };
  const createIterationButton = <Link className={'button -primary'} to={{ pathname: '/iterations/new', state }}>Create an iteration</Link>;
  if (!props.iterations || props.iterations.length === 0) {
    const title = "No iterations for this release.";
    const subtitle = "Let's plan one so you can get started.";
    return (
      <div>
        <PageBack to={`/projects/${props.release.projectId}/open`} title={'Releases'}/>
        <PageHeader title={props.release.name || ''}/>
        <EmptyList title={title} subtitle={subtitle} button={createIterationButton}/>
      </div>
    );
  }
  return (
    <div>
      <PageBack to={`/projects/${props.release.projectId}/open`} title={'Releases'}/>
      <PageHeader title={props.release.name || ''}>{createIterationButton}</PageHeader>
      <IterationList iterations={props.iterations} />
    </div>
  );
};

ReleaseOpen.propTypes = {
  release: PropTypes.object.isRequired,
  iterations: PropTypes.array,
};

export default ReleaseOpen;
