import React, { Component } from 'react';
import ProjectList from '../../components/ProjectList';
import API from '../../lib/API';
import { UnauthorizedError } from '../../lib/Errors';
import { Link, Redirect } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

class ProjectListScene extends Component {

  constructor(props) {
    super(props);
    this.state = { projects: [] }
  }

  componentWillMount() {
    (async () => {
      try {
        const { errors, data: projects } = await API.findProjects();
        if (errors) {
          console.error(errors);
          return alert('Failed to find projects.');
        }
        this.setState({ projects });
      } catch (err) {
        if (err instanceof UnauthorizedError) {
          API.signout();
          this.setState({ unauthorized: true });
        }
      }
    })();
  }

  render() {
    if (this.state.unauthorized) {
      return <Redirect to={'/login'}/>
    }
    return (
      <div>
        <PageHeader title={'Projects'}>
          <Link className={'button -primary'} to={'/projects/new'}>Create a project</Link>
        </PageHeader>
        <ProjectList projects={this.state.projects}/>
      </div>
    )
  }

}

export default ProjectListScene;
