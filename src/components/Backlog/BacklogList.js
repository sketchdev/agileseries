import React from 'react';
import PropTypes from 'prop-types';
import BacklogListItem from './BacklogListItem';
import { Link } from 'react-router-dom';
import EmptyList from '../Page/EmptyList';

const BacklogList = props => {
  const state = { projectId: props.projectId };
  const createButton = <Link className={'button -primary'} to={{ pathname: '/backlogs/new', state }}>Create a backlog</Link>;
  if (!props.backlogs || props.backlogs.length === 0) {
    return <EmptyList title={"No backlogs for this release."} subtitle={"Let's plan one so you can get started."} buttons={[createButton]}/>;
  }
  return (
    <div>
      {props.backlogs.map(backlog => <BacklogListItem key={backlog.id} id={backlog.id} name={backlog.name} notes={backlog.notes}/>)}
    </div>
  );
};

BacklogList.propTypes = {
  backlogs: PropTypes.array.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default BacklogList;
