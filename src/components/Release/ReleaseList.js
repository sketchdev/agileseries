import React from 'react';
import PropTypes from 'prop-types';
import ReleaseListItem from './ReleaseListItem';
import { Link } from 'react-router-dom';
import EmptyList from '../Page/EmptyList';

const ReleaseList = props => {
  const state = { projectId: props.projectId };
  const createButton = <Link className={'button -primary'} to={{ pathname: '/releases/new', state }}>Create a release</Link>;
  if (!props.releases || props.releases.length === 0) {
    return <EmptyList title={"No releases for this project."} subtitle={"Let's plan one so you can get started."} buttons={[createButton]}/>;
  }
  return (
    <div>
      {props.releases.map(release => <ReleaseListItem key={release.id} id={release.id} name={release.name} notes={release.notes}/>)}
    </div>
  );
};

ReleaseList.propTypes = {
  releases: PropTypes.array.isRequired,
};

export default ReleaseList;
