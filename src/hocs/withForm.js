import React from 'react';
import { Redirect } from 'react-router-dom';
import { NotFoundError, UnauthorizedError } from '../lib/Errors';
import ProgressScene from '../scenes/Progress/ProgressScene';
import UnexpectedScene from '../scenes/Error/UnexpectedScene';
import NotFoundScene from '../scenes/Error/NotFoundScene';

export default function withForm(WrappedComponent, title, fieldsMethod, validateMethod, submitMethod, successPathMethod) {

  return class extends React.Component {

    constructor(props) {
      super(props);
      const fields = fieldsMethod(props);
      this.state = {
        fields,
        errors: {},
        pending: false,
        unauthorized: false,
        notfound: false,
        unexpected: false,
        submitPhase: null,
        successPath: null,
      };
    }

    componentDidUpdate(prevProps, prevState) {
      switch (this.state.submitPhase) {
        case 'pending':
          this.setState({ pending: true, submitPhase: 'validate' });
          break;
        case 'validate':
          this.validate();
          break;
        case 'submit':
          this.submit();
          break;
        case 'complete':
          this.complete();
          break;
        default:
          break;
      }
    }

    handleInputChange = (e) => {
      const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      const fields = { ...this.state.fields };
      fields[name] = value;
      this.setState({ fields });
    };

    handleCall = (errors, nextPhase) => {
      if (errors && Object.keys(errors).length > 0) {
        this.setState({ errors, submitPhase: 'complete' });
      } else {
        this.setState({ submitPhase: nextPhase });
      }
    };

    validate = () => {
      const self = this;
      (async () => {
        const errors = await validateMethod.call({}, { ...this.state.fields });
        self.handleCall(errors, 'submit');
      })();
    };

    submit = () => {
      const self = this;
      (async () => {
        try {
          const { errors } = await submitMethod.call({}, this.props, { ...this.state.fields });
          self.handleCall(errors, 'complete');
        } catch (err) {
          if (err instanceof UnauthorizedError) {
            this.setState({ errors: { base: 'Unauthorized' }, pending: false, unauthorized: true, submitPhase: 'complete' });
          } else if (err instanceof NotFoundError) {
            this.setState({ errors: { base: 'NotFound' }, pending: false, notfound: true, submitPhase: 'complete' });
          } else {
            console.error(err);
            this.setState({ errors: { base: 'Unknown' }, pending: false, unexpected: true, submitPhase: 'complete' });
          }
        }
      })();
    };

    complete = () => {
      if (!this.state.errors || Object.keys(this.state.errors).length === 0) {
        this.setState({ submitPhase: null, pending: false, successPath: successPathMethod.call({}, this.props) });
      } else {
        this.setState({ submitPhase: null, pending: false });
      }
    };

    handleSubmit = (e) => {
      e.preventDefault();
      this.setState({ submitPhase: 'pending' });
    };

    render() {
      let errors = this.state.errors;

      if (this.state.notfound) {
        return <NotFoundScene/>;
      }
      if (this.state.unauthorized) {
        if (this.props.location.pathname !== '/login') {
          return <Redirect to={{ pathname: '/login', state: { from: this.props.location } }}/>;
        } else {
          errors = { base: 'Invalid email and/or password.' };
        }
      }
      if (this.state.unexpected) {
        return <UnexpectedScene/>;
      }
      if (this.state.pending) {
        return <ProgressScene/>;
      }
      if (this.state.successPath) {
        return <Redirect to={this.state.successPath}/>
      }
      return <WrappedComponent title={title(this.props)} fields={this.state.fields} errors={errors} onChange={this.handleInputChange} onSubmit={this.handleSubmit} {...this.props}/>
    }

  }

}
