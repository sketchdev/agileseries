import React from 'react';
import Field from '../Form/Field';
import PropTypes from 'prop-types';
import PageHeader from '../Page/PageHeader';
import { Link } from 'react-router-dom';
import FormActions from '../Form/FormActions';

class StoryForm extends React.Component {

  render() {
    return (
      <div className={'scene-container -slim'}>
        <PageHeader title={this.props.title}/>
        <form onSubmit={this.props.onSubmit}>
          <input type={'hidden'} name={'iterationId'} value={this.props.fields.iterationId}/>
          <input type={'hidden'} name={'backlogId'} value={this.props.fields.backlogId}/>
          <Field label={'Title'} type={'text'} name={'title'} error={this.props.errors.title} onChange={this.props.onChange} value={this.props.fields.title} autoFocus={true}/>
          <Field label={'Points'} type={'number'} name={'points'} error={this.props.errors.points} onChange={this.props.onChange} value={this.props.fields.points}/>
          <Field label={'Notes'} type={'textarea'} name={'notes'} error={this.props.errors.notes} onChange={this.props.onChange} value={this.props.fields.notes} rows={4}/>
          <FormActions>
            <button type={'submit'}>Save</button>
            {this.props.fields.iterationId ? (
              <Link className={'button'} to={`/iterations/${this.props.fields.iterationId}/open`}>Cancel</Link>
            ) : (
              <Link className={'button'} to={`/backlogs/${this.props.fields.backlogId}/open`}>Cancel</Link>
            )}
          </FormActions>
        </form>
      </div>
    );
  }

}

StoryForm.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.shape({
    iterationId: PropTypes.string,
    backlogId: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string,
    points: PropTypes.string,
    notes: PropTypes.string,
  }),
  errors: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default StoryForm;
