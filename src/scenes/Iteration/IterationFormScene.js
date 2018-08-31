import IterationForm from '../../components/IterationForm';
import API from '../../lib/API';
import withForm from '../../hocs/withForm';
import validator from 'validator';

const fields = (props) => {
  if (props.lookup) {
    return props.lookup.data;
  }
  return { releaseId: props.location.state.releaseId, name: null, notes: null };
};

const validate = (fields) => {
  if (validator.isEmpty(fields.name || '')) {
    return { name: 'This is a required field.' };
  }
  return {};
};

const successPath = (props) => {
  let releaseId = props.lookup ? props.lookup.data.releaseId : props.location.state.releaseId;
  return `/releases/${releaseId}/open`;
};

const submit = (props, fields) => {
  if (props.lookup) {
    return API.updateIteration(fields);
  } else {
    return API.createIteration(fields);
  }
};

const title = (props) => {
  return props.lookup ? 'Edit Iteration' : 'New Iteration';
};

export default withForm(IterationForm, title, fields, validate, submit, successPath);
