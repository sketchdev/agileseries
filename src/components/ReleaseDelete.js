import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from './PageHeader';
import PageBack from './PageBack';
import FormActions from './FormActions';
import { Link } from 'react-router-dom';

class ReleaseForm extends React.Component {

  render() {
    return (
      <div className={'scene-container -slim'}>
        <PageBack to={`/projects/${this.props.fields.projectId}/open`} title={'Project'}/>
        <PageHeader title={this.props.title}/>
        <h2>Are you sure you want to delete this release?</h2>
        <form onSubmit={this.props.onSubmit}>
          <input type={'hidden'} name={'projectId'} value={this.props.fields.projectId}/>
          <FormActions>
            <button className={'-danger'} type={'submit'}>Yes, delete this release</button>
            <Link className={'button'} to={`/projects/${this.props.fields.projectId}/open`}>Nevermind</Link>
          </FormActions>
        </form>
      </div>
    );
  }

}

ReleaseForm.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  errors: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ReleaseForm;
