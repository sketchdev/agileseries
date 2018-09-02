import API from '../../lib/API';
import ConfirmForm from '../../components/User/ConfirmForm';
import { allFieldsRequired } from '../../lib/Validation';
import withForm from '../../hocs/withForm';

const fields = (props) => {
  return { email: null, confirmationCode: null };
};

const successPath = (props) => {
  return '/login';
};

const submit = (props, fields) => {
  return API.confirm(fields);
};

const title = (props) => {
  return 'User confirmation';
};

export default withForm(ConfirmForm, title, fields, allFieldsRequired, submit, successPath);
