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
