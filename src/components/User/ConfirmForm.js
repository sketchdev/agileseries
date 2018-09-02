import React from 'react';
import Field from '../Form/Field';
import PropTypes from 'prop-types';
import PageHeader from '../Page/PageHeader';
import FormActions from '../Form/FormActions';

class ConfirmForm extends React.Component {

  render() {
    return (
      <div className={'scene-container -slim'}>
        <PageHeader title={this.props.title}/>
        <form onSubmit={this.props.onSubmit}>
          <Field label={'Email'} type={'text'} name={'email'} error={this.props.errors.email} onChange={this.props.onChange} value={this.props.fields.email} autoFocus={true}/>
          <Field label={'Confirmation Code'} type={'text'} name={'confirmationCode'} error={this.props.errors.confirmationCode} onChange={this.props.onChange}
                 value={this.props.fields.confirmationCode}/>
          <FormActions>
            <button type={'submit'}>Confirm Email</button>
          </FormActions>
        </form>
      </div>
    );
  }

}

ConfirmForm.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.shape({
    email: PropTypes.string,
    confirmationCode: PropTypes.string,
  }),
  errors: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ConfirmForm;
