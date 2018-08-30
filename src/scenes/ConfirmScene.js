import withFormScene from '../hocs/withFormScene';
import API from '../lib/API';
import ConfirmForm from '../components/ConfirmForm';
import { allFieldsRequired } from '../lib/Validation';

export default withFormScene(ConfirmForm, 'User confirmation', { email: null, confirmationCode: null }, null, allFieldsRequired, API.confirm, '/login');
