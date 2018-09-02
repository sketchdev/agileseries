import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../Page/PageHeader';
import ReleaseList from '../Release/ReleaseList';
import TabControl from '../Page/TabControl';
import BacklogList from '../Backlog/BacklogList';
import { Link } from 'react-router-dom';

const ProjectOpen = props => {
  const tabs = {
    releases: { title: 'Releases', content: <ReleaseList releases={props.releases} projectId={props.project.id}/> },
    backlogs: { title: 'Backlogs', content: <BacklogList backlogs={props.backlogs} projectId={props.project.id}/> }
  };
  const linkState = { projectId: props.project.id };
  return (
    <div>
      <PageHeader title={props.project.name}>
        {props.activeTab === 'releases' && props.releases.length > 0 ? (
          <Link className={'button -primary'} to={{ pathname: '/releases/new', state: linkState }}>Create a release</Link>
        ) : null}
        {props.activeTab === 'backlogs' && props.backlogs.length > 0 ? (
          <Link className={'button -primary'} to={{ pathname: '/backlogs/new', state: linkState }}>Create a backlog</Link>
        ) : null}
      </PageHeader>
      <TabControl activeTab={props.activeTab} tabs={tabs} onChange={props.onTabChanged}/>
    </div>
  );
};

ProjectOpen.propTypes = {
  project: PropTypes.object.isRequired,
  onTabChanged: PropTypes.func.isRequired,
  activeTab: PropTypes.oneOf(['releases', 'backlogs']),
  releases: PropTypes.array,
  backlogs: PropTypes.array,
};

ProjectOpen.defaultProps = {
  activeTab: 'releases',
};

export default ProjectOpen;
