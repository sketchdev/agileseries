import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EmptyList from './EmptyList';
import PageHeader from './PageHeader';
import ReleaseList from './ReleaseList';

const ProjectOpen = props => {
  const state = { projectId: props.project.id };
  const createReleaseButton = <Link className={'button -primary'} to={{ pathname: '/releases/new', state }}>Create a release</Link>;
  if (!props.releases || props.releases.length === 0) {
    const title = "No releases for this project.";
    const subtitle = "Let's plan one so you can get started.";
    return (
      <div>
        <PageHeader title={props.project.name || ''}/>
        <EmptyList title={title} subtitle={subtitle} button={createReleaseButton}/>
      </div>
    );
  }
  return (
    <div>
      <PageHeader title={props.project.name || ''}>{createReleaseButton}</PageHeader>
      <ReleaseList releases={props.releases} />
    </div>
  );
};

ProjectOpen.propTypes = {
  project: PropTypes.object.isRequired,
  releases: PropTypes.array,
};

export default ProjectOpen;
