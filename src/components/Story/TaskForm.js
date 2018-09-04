import React from 'react';
import Field from '../Form/Field';
import PropTypes from 'prop-types';
import PageHeader from '../Page/PageHeader';
import { Link } from 'react-router-dom';
import FormActions from '../Form/FormActions';

class TaskForm extends React.Component {

  render() {
    return (
      <div className={'scene-container -slim'}>
        <PageHeader title={this.props.title}/>
        <form onSubmit={this.props.onSubmit}>
          <input type={'hidden'} name={'storyId'} value={this.props.location.state.storyId}/>
          <Field label={'Title'} type={'text'} name={'title'} error={this.props.errors.title} onChange={this.props.onChange} value={this.props.fields.title} autoFocus={true}/>
          <Field label={'Owner'} type={'text'} name={'owner'} error={this.props.errors.owner} onChange={this.props.onChange} value={this.props.fields.owner}/>
          <Field label={'Notes'} type={'textarea'} name={'notes'} error={this.props.errors.notes} onChange={this.props.onChange} value={this.props.fields.notes} rows={4}/>
          <FormActions>
            <button type={'submit'}>Save</button>
            <Link className={'button'} to={`/iterations/${this.props.location.state.iterationId}/open`}>Cancel</Link>
          </FormActions>
        </form>
      </div>
    );
  }

}

TaskForm.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.shape({
    title: PropTypes.string,
    owner: PropTypes.string,
    notes: PropTypes.string,
  }),
  errors: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default TaskForm;
