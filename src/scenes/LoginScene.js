import withFormScene from '../hocs/withFormScene';
import LoginForm from '../components/LoginForm';
import API from '../lib/API';
import { allFieldsRequired } from '../lib/Validation';

export default withFormScene(LoginForm, 'Log in', { email: null, password: null }, null, allFieldsRequired, API.authenticate, '/projects');
