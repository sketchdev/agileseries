import withFormScene from '../hocs/withFormScene';
import RegisterForm from '../components/RegisterForm';
import validator from 'validator';
import API from '../lib/API';

const validate = async (fields) => {
  const errors = {};
  for (const field of Object.keys(fields)) {
    if (validator.isEmpty((fields[field] || '').toString())) {
      errors[field] = 'This field is required.'
    }
  }
  const noPasswordErrorsYet = !errors.password && !errors.passwordConfirmation;
  if (noPasswordErrorsYet && fields.password !== fields.passwordConfirmation) {
    errors.passwordConfirmation = "Passwords don't match.";
  }
  return errors;
};

export default withFormScene(RegisterForm, 'Register', { email: null, password: null, passwordConfirmation: null }, null, validate, API.register, '/confirm');
