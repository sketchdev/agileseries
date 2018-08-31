import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import PrivateRoute from './lib/PrivateRoute';
import NotFound from './components/NotFound';
import RegisterScene from './scenes/RegisterScene';
import ConfirmScene from './scenes/ConfirmScene';
import LoginScene from './scenes/LoginScene';
import ProjectListScene from './scenes/Project/ProjectListScene';
import ProjectFormScene from './scenes/Project/ProjectFormScene';
import ErrorBoundary from './components/ErrorBoundry';
import Navigation from './components/Navigation';
import LogoutScene from './scenes/LogoutScene';
import ProjectOpenScene from './scenes/Project/ProjectOpenScene';
import withLookup from './hocs/withLookup';
import ReleaseFormScene from './scenes/Release/ReleaseFormScene';
import API from './lib/API';
import ReleaseDeleteScene from './scenes/Release/ReleaseDeleteScene';
import IterationFormScene from './scenes/Iteration/IterationFormScene';
import IterationDeleteScene from './scenes/Iteration/IterationDeleteScene';
import ReleaseOpenScene from './scenes/Release/ReleaseOpenScene';

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

                  {/*USERS*/}

                  <Route exact path="/" component={LoginScene}/>
                  <Route exact path="/login" component={LoginScene}/>
                  <Route exact path="/logout" component={LogoutScene}/>
                  <Route exact path="/register" component={RegisterScene}/>
                  <Route exact path="/confirm" component={ConfirmScene}/>

                  {/*PROJECTS*/}

                  <PrivateRoute exact path="/projects" component={ProjectListScene}/> <------ TODO
                  <PrivateRoute exact path="/projects/new" component={ProjectFormScene}/>
                  <PrivateRoute exact path="/projects/:id/edit" component={withLookup(ProjectFormScene, props => API.findProjectById(props.match.params.id))}/>
                  <PrivateRoute exact path="/projects/:id/open" component={withLookup(ProjectOpenScene, props => API.findProjectByIdWithReleases(props.match.params.id))}/>

                  {/*RELEASES*/}

                  <PrivateRoute exact path="/releases/new" component={ReleaseFormScene}/>
                  <PrivateRoute exact path="/releases/:id/open" component={withLookup(ReleaseOpenScene, props => API.findReleaseByIdWithIterations(props.match.params.id))}/>
                  <PrivateRoute exact path="/releases/:id/edit" component={withLookup(ReleaseFormScene, props => API.findReleaseById(props.match.params.id))}/>
                  <PrivateRoute exact path="/releases/:id/delete" component={withLookup(ReleaseDeleteScene, props => API.findReleaseById(props.match.params.id))}/>

                  {/*ITERATIONS*/}

                  <PrivateRoute exact path="/iterations/new" component={IterationFormScene}/>
                  <PrivateRoute exact path="/iterations/:id/edit" component={withLookup(IterationFormScene, props => API.findIterationById(props.match.params.id))}/>
                  <PrivateRoute exact path="/iterations/:id/delete" component={withLookup(IterationDeleteScene, props => API.findIterationById(props.match.params.id))}/>

                  {/*FALLTHROUGH*/}

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
