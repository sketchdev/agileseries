import React from 'react';
import Field from '../Form/Field';
import PropTypes from 'prop-types';
import PageHeader from '../Page/PageHeader';
import FormActions from '../Form/FormActions';
import { Link } from 'react-router-dom';

class ReleaseForm extends React.Component {

  render() {
    return (
      <div className={'scene-container -slim'}>
        <PageHeader title={this.props.title}/>
        <form onSubmit={this.props.onSubmit}>
          <input type={'hidden'} name={'projectId'} value={this.props.fields.projectId}/>
          <Field label={'Name'} type={'text'} name={'name'} error={this.props.errors.name} onChange={this.props.onChange} value={this.props.fields.name} autoFocus={true}/>
          <Field label={'Notes'} type={'text'} name={'notes'} error={this.props.errors.notes} onChange={this.props.onChange} value={this.props.fields.notes}/>
          <FormActions>
            <button type={'submit'}>Save</button>
            <Link className={'button'} to={`/projects/${this.props.fields.projectId}/open`}>Cancel</Link>
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
    notes: PropTypes.string,
  }),
  errors: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ReleaseForm;
