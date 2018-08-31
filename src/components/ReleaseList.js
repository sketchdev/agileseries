import React from 'react';
import PropTypes from 'prop-types';
import ReleaseListItem from './ReleaseListItem';

const ReleaseList = props => {
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
