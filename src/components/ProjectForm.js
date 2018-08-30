import React from 'react';
import Field from './Field';
import PropTypes from 'prop-types';
import PageHeader from './PageHeader';
import PageBack from './PageBack';
import FormActions from './FormActions';
import { Link } from 'react-router-dom';

class ProjectForm extends React.Component {

  render() {
    return (
      <div className={'scene-container -slim'}>
        <PageBack to={'/projects'} title={'Projects'}/>
        <PageHeader title={this.props.title}/>
        <form onSubmit={this.props.onSubmit}>
          <Field label={'Name'} type={'text'} name={'name'} error={this.props.errors.name} onChange={this.props.onChange} value={this.props.fields.name} autoFocus={true}/>
          <Field label={'Company'} type={'text'} name={'company'} error={this.props.errors.company} onChange={this.props.onChange} value={this.props.fields.company}/>
          <FormActions>
            <button type={'submit'}>Save</button>
            <Link className={'button'} to={'/projects'}>Cancel</Link>
          </FormActions>
        </form>
      </div>
    );
  }

}

ProjectForm.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    company: PropTypes.string,
  }),
  errors: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ProjectForm;
