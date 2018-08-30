import React from 'react';
import Progress from '../components/Progress';
import { Redirect } from 'react-router-dom';
import { UnauthorizedError } from '../lib/Errors';
import API from '../lib/API';

const READY = 0;
const PENDING = 1;
const SUCCESS = 2;
const ERROR = 3;

export default function withFormScene(WrappedComponent, title, fields, fetcher, validate, submitter, successRedirect) {

  return class extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        fields,
        errors: {},
        status: READY,
      };
    }

    componentWillMount() {
      if (fetcher) {
        (async () => {
          try {
            this.setState({ status: PENDING });
            const fields = await fetcher.call({});
            this.setState({ status: READY, fields });
          } catch (err) {
            console.error(err);
            if (err instanceof UnauthorizedError) {
              this.setState({ unauthorized: true });
            } else {
              alert(err);
            }
          }
        })();
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

    handleSubmit = async (e) => {
      e.preventDefault();
      const errors = await validate.call({}, { ...this.state.fields });
      if (errors && Object.keys(errors).length > 0) {
        this.setState({ errors, status: ERROR });
      } else {
        await this.submitRunner.call({}, {
          setPending: () => {
            this.setState({ status: PENDING });
          },
          setSuccessful: () => {
            this.setState({ status: SUCCESS });
          },
          setError: (errors) => {
            this.setState({ errors, status: ERROR });
          }
        }, { ...this.state.fields });
      }
    };

    submitRunner = async (ctx, fields) => {
      try {
        const { errors } = await submitter.call({}, fields);
        if (errors) {
          return ctx.setError(errors);
        }
        ctx.setSuccessful();
      } catch (err) {
        console.error(err);
        if (err instanceof UnauthorizedError) {
          API.signout();
          this.setState({ unauthorized: true });
        } else {
          alert(err);
        }
      }
    };

    render() {
      switch (this.state.status) {
        case PENDING:
          return <Progress/>;
        case SUCCESS:
          return <Redirect to={successRedirect}/>;
        case ERROR:
        default:
          return <WrappedComponent title={title} fields={this.state.fields} errors={this.state.errors} onChange={this.handleInputChange} onSubmit={this.handleSubmit}/>;
      }
    }

  }

}
