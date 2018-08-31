import ReleaseForm from '../../components/ReleaseForm';
import API from '../../lib/API';
import withForm from '../../hocs/withForm';
import validator from 'validator';

const fields = (props) => {
  if (props.lookup) {
    return props.lookup.data;
  }
  return { projectId: props.location.state.projectId, name: null, notes: null };
};

const validate = (fields) => {
  if (validator.isEmpty(fields.name || '')) {
    return { name: 'This is a required field.' };
  }
  return {};
};

const successPath = (props) => {
  let projectId = props.lookup ? props.lookup.data.projectId : props.location.state.projectId;
  return `/projects/${projectId}/open`;
};

const submit = (props, fields) => {
  if (props.lookup) {
    return API.updateRelease(fields);
  } else {
    return API.createRelease(fields);
  }
};

const title = (props) => {
  return props.lookup ? 'Edit Release' : 'New Release';
};

export default withForm(ReleaseForm, title, fields, validate, submit, successPath);
