import RegisterForm from '../../components/User/RegisterForm';
import validator from 'validator';
import API from '../../lib/API';
import withForm from '../../hocs/withForm';

const fields = (props) => {
  return { email: null, password: null, passwordConfirmation: null };
};

const validate = (fields) => {
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

const successPath = (props) => {
  return '/confirm';
};

const submit = (props, fields) => {
  return API.register(fields);
};

const title = (props) => {
  return 'Register';
};

export default withForm(RegisterForm, title, fields, validate, submit, successPath);
