import React from 'react';
import Field from '../Form/Field';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PageHeader from '../Page/PageHeader';
import FormActions from '../Form/FormActions';
import BaseError from '../Error/BaseError';

class LoginForm extends React.Component {

  render() {
    return (
      <div className={'scene-container -slim'}>
        <PageHeader title={this.props.title}/>
        <BaseError errors={this.props.errors} />
        <form onSubmit={this.props.onSubmit}>
          <Field label={'Email'} type={'text'} name={'email'} error={this.props.errors.email} onChange={this.props.onChange} value={this.props.fields.email} autoFocus={true}/>
          <Field label={'Password'} type={'password'} name={'password'} error={this.props.errors.password} onChange={this.props.onChange} value={this.props.fields.password}/>
          <FormActions>
            <button type={'submit'}>Login</button>
            <Link className={'button -link'} to={'/register'}>Or, create an account</Link>
          </FormActions>
        </form>
      </div>
    );
  }

}

LoginForm.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  errors: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
