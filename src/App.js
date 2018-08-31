import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import PrivateRoute from './lib/PrivateRoute';
import Root from './components/Root';
import NotFound from './components/NotFound';
import RegisterScene from './scenes/RegisterScene';
import ConfirmScene from './scenes/ConfirmScene';
import LoginScene from './scenes/LoginScene';
import ProjectListScene from './scenes/ProjectListScene';
import ProjectNewScene from './scenes/ProjectNewScene';
import ErrorBoundary from './components/ErrorBoundry';
import Navigation from './components/Navigation';
import LogoutScene from './scenes/LogoutScene';
import ProjectEditScene from './scenes/ProjectEditScene';
import ProjectOpenScene from './scenes/ProjectOpenScene';
import withLookup from './hocs/withLookup';
import ReleaseFormScene from './scenes/ReleaseFormScene';
import API from './lib/API';
import ReleaseDeleteScene from './scenes/ReleaseDeleteScene';
import ReleaseOpen from './components/ReleaseOpen';
import IterationFormScene from './scenes/IterationFormScene';
import IterationDeleteScene from './scenes/IterationDeleteScene';

class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <Router>
          <div>
            <header className={'app-header'}>
              <div className={'inner'}>
                <div className={'logo'}>
                  <Link to={'/'}>AgileSeries</Link>
                </div>
                <div className={'nav'}>
                  <Navigation/>
                </div>
              </div>
            </header>
            <div className={'app-content'}>
              <div className={'inner'}>
                <Switch>
                  <Route exact path="/" component={Root}/>
                  <Route exact path="/login" component={LoginScene}/>
                  <Route exact path="/logout" component={LogoutScene}/>
                  <Route exact path="/register" component={RegisterScene}/>
                  <Route exact path="/confirm" component={ConfirmScene}/>

                  <PrivateRoute exact path="/projects" component={ProjectListScene}/>
                  <PrivateRoute exact path="/projects/new" component={ProjectNewScene}/>
                  <PrivateRoute exact path="/projects/:id/edit" component={ProjectEditScene}/>
                  <PrivateRoute exact path="/projects/:id/open" component={withLookup(ProjectOpenScene, props => {
                    return Promise.all([
                      API.findProjectById(props.match.params.id),
                      API.findReleasesByProjectId(props.match.params.id)
                    ]);
                  })}/>

                  <PrivateRoute exact path="/releases/new" component={ReleaseFormScene}/>
                  <PrivateRoute exact path="/releases/:id/open" component={withLookup(props => {
                    const { data: release } = props.lookup[0];
                    const { data: iterations } = props.lookup[1];
                    return <ReleaseOpen release={release} iterations={iterations}/>;
                  }, props => {
                    return Promise.all([
                      API.findReleaseById(props.match.params.id),
                      API.findIterationsByReleaseId(props.match.params.id)
                    ]);
                  })}/>
                  <PrivateRoute exact path="/releases/:id/edit" component={withLookup(ReleaseFormScene, props => API.findReleaseById(props.match.params.id))}/>
                  <PrivateRoute exact path="/releases/:id/delete" component={withLookup(ReleaseDeleteScene, props => API.findReleaseById(props.match.params.id))}/>

                  <PrivateRoute exact path="/iterations/new" component={IterationFormScene}/>
                  <PrivateRoute exact path="/iterations/:id/edit" component={withLookup(IterationFormScene, props => API.findIterationById(props.match.params.id))}/>
                  <PrivateRoute exact path="/iterations/:id/delete" component={withLookup(IterationDeleteScene, props => API.findIterationById(props.match.params.id))}/>

                  <Route component={NotFound}/>
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </ErrorBoundary>
    );
  }
}

export default App;
