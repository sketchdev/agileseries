import API from '../lib/API';
import withForm from '../hocs/withForm';
import IterationDelete from '../components/IterationDelete';

const fields = (props) => {
  return props.lookup.data;
};

const validate = (fields) => {
  return {};
};

const successPath = (props) => {
  return `/releases/${props.lookup.data.releaseId}/open`;
};

const submit = (props, fields) => {
  return API.deleteIterationById(props.lookup.data.id);
};

const title = (props) => {
  return props.lookup.data.name;
};

export default withForm(IterationDelete, title, fields, validate, submit, successPath);
