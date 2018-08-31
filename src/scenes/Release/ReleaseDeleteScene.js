import API from '../../lib/API';
import withForm from '../../hocs/withForm';
import ReleaseDelete from '../../components/ReleaseDelete';

const fields = (props) => {
  return props.lookup.data;
};

const validate = (fields) => {
  return {};
};

const successPath = (props) => {
  return `/projects/${props.lookup.data.projectId}/open`;
};

const submit = (props, fields) => {
  return API.deleteReleaseById(props.lookup.data.id);
};

const title = (props) => {
  return props.lookup.data.name;
};

export default withForm(ReleaseDelete, title, fields, validate, submit, successPath);
