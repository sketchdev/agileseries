import LoginForm from '../../components/User/LoginForm';
import API from '../../lib/API';
import { allFieldsRequired } from '../../lib/Validation';
import withForm from '../../hocs/withForm';

const fields = (props) => {
  return { email: null, password: null };
};

const successPath = (props) => {
  return '/projects';
};

const submit = (props, fields) => {
  return API.authenticate(fields);
};

const title = (props) => {
  return 'Log in';
};

export default withForm(LoginForm, title, fields, allFieldsRequired, submit, successPath);
