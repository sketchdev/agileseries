import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import PrivateRoute from './lib/PrivateRoute';
import NotFound from './components/Page/NotFound';
import RegisterScene from './scenes/User/RegisterScene';
import ConfirmScene from './scenes/User/ConfirmScene';
import LoginScene from './scenes/User/LoginScene';
import ProjectListScene from './scenes/Project/ProjectListScene';
import ProjectFormScene from './scenes/Project/ProjectFormScene';
import ErrorBoundary from './components/Error/ErrorBoundry';
import Navigation from './components/Page/Navigation';
import LogoutScene from './scenes/User/LogoutScene';
import ProjectOpenScene from './scenes/Project/ProjectOpenScene';
import withLookup from './hocs/withLookup';
import ReleaseFormScene from './scenes/Release/ReleaseFormScene';
import API from './lib/API';
import ReleaseDeleteScene from './scenes/Release/ReleaseDeleteScene';
import IterationFormScene from './scenes/Iteration/IterationFormScene';
import IterationDeleteScene from './scenes/Iteration/IterationDeleteScene';
import ReleaseOpenScene from './scenes/Release/ReleaseOpenScene';
import IterationOpenScene from './scenes/Iteration/IterationOpenScene';
import StoryFormScene from './scenes/Story/StoryFormScene';
import StoryDeleteScene from './scenes/Story/StoryDeleteScene';
import TaskFormScene from './scenes/Task/TaskFormScene';

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

                  <PrivateRoute exact path="/projects" component={withLookup(ProjectListScene, API.findProjects)}/>
                  <PrivateRoute exact path="/projects/new" component={ProjectFormScene}/>
                  <PrivateRoute exact path="/projects/:id/edit" component={withLookup(ProjectFormScene, props => API.findProjectById(props.match.params.id))}/>
                  <PrivateRoute exact path="/projects/:id/open" component={withLookup(ProjectOpenScene, props => API.findProjectByIdWithDetails(props.match.params.id))}/>

                  {/*RELEASES*/}

                  <PrivateRoute exact path="/releases/new" component={ReleaseFormScene}/>
                  <PrivateRoute exact path="/releases/:id/open" component={withLookup(ReleaseOpenScene, props => API.findReleaseByIdWithDetails(props.match.params.id))}/>
                  <PrivateRoute exact path="/releases/:id/edit" component={withLookup(ReleaseFormScene, props => API.findReleaseById(props.match.params.id))}/>
                  <PrivateRoute exact path="/releases/:id/delete" component={withLookup(ReleaseDeleteScene, props => API.findReleaseById(props.match.params.id))}/>

                  {/*ITERATIONS*/}

                  <PrivateRoute exact path="/iterations/new" component={IterationFormScene}/>
                  <PrivateRoute exact path="/iterations/:id/open" component={withLookup(IterationOpenScene, props => API.findIterationByIdWithDetails(props.match.params.id))}/>
                  <PrivateRoute exact path="/iterations/:id/edit" component={withLookup(IterationFormScene, props => API.findIterationById(props.match.params.id))}/>
                  <PrivateRoute exact path="/iterations/:id/delete" component={withLookup(IterationDeleteScene, props => API.findIterationById(props.match.params.id))}/>

                  {/*STORIES*/}

                  <PrivateRoute exact path="/stories/new" component={StoryFormScene}/>
                  <PrivateRoute exact path="/stories/:id/edit" component={withLookup(StoryFormScene, props => API.findStoryById(props.match.params.id))}/>
                  <PrivateRoute exact path="/stories/:id/delete" component={withLookup(StoryDeleteScene, props => API.findStoryById(props.match.params.id))}/>

                  {/*TASKS*/}

                  <PrivateRoute exact path="/tasks/new" component={TaskFormScene}/>
                  <PrivateRoute exact path="/tasks/:storyId/:id/edit" component={withLookup(TaskFormScene, props => API.findTaskById(props.match.params.storyId, props.match.params.id))}/>

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
