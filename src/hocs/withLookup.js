import React from 'react';
import { Redirect } from 'react-router-dom';
import { NotFoundError, UnauthorizedError } from '../lib/Errors';
import ProgressScene from '../scenes/ProgressScene';
import UnexpectedScene from '../scenes/UnexpectedScene';
import NotFoundScene from '../scenes/NotFoundScene';

export default function withLookup(WrappedComponent, lookupMethod) {

  return class extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        lookups: {},
        pending: true,
        unauthorized: false,
        notfound: false,
        unexpected: false,
      };
    }

    componentWillMount() {
      (async () => {
        try {
          const lookup = await lookupMethod.call({}, this.props);
          this.setState({ lookup, pending: false });
        } catch (err) {
          if (err instanceof UnauthorizedError) {
            this.setState({ unauthorized: true, pending: false });
          } else if (err instanceof NotFoundError) {
            this.setState({ notfound: true, pending: false });
          } else {
            console.error(err);
            this.setState({ unexpected: true, pending: false });
          }
        }
      })();
    }

    render() {
      if (this.state.notfound) {
        return <NotFoundScene/>;
      }
      if (this.state.unauthorized) {
        return <Redirect to={{ pathname: '/login', state: { from: this.props.location } }}/>;
      }
      if (this.state.unexpected) {
        return <UnexpectedScene/>;
      }
      if (this.state.pending) {
        return <ProgressScene/>;
      }
      return <WrappedComponent lookup={this.state.lookup} {...this.props}/>
    }

  }

}
