import React from 'react';
import Field from '../Form/Field';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PageHeader from '../Page/PageHeader';
import FormActions from '../Form/FormActions';

class RegisterForm extends React.Component {

  render() {
    return (
      <div className={'scene-container -slim'}>
        <PageHeader title={this.props.title}/>
        <form onSubmit={this.props.onSubmit}>
          <Field label={'Email'} type={'text'} name={'email'} error={this.props.errors.email} onChange={this.props.onChange} value={this.props.fields.email} autoFocus={true}/>
          <Field label={'Password'} type={'password'} name={'password'} error={this.props.errors.password} onChange={this.props.onChange} value={this.props.fields.password}/>
          <Field label={'Retype Password'} type={'password'} name={'passwordConfirmation'} error={this.props.errors.passwordConfirmation} onChange={this.props.onChange}
                 value={this.props.fields.passwordConfirmation}/>
          <FormActions>
            <button type={'submit'}>Register</button>
            <Link className={'button -link'} to={'/login'}>Or, log in with your existing account.</Link>
          </FormActions>
        </form>
      </div>
    );
  }

}

RegisterForm.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    passwordConfirmation: PropTypes.string,
  }),
  errors: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default RegisterForm;
