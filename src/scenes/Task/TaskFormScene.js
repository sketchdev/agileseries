import API from '../../lib/API';
import withForm from '../../hocs/withForm';
import validator from 'validator';
import TaskForm from '../../components/Story/TaskForm';

const fields = (props) => {
  if (props.lookup) {
    return props.lookup.data;
  }
  return {
    storyId: props.location.state.storyId,
    title: null,
    owner: null,
    notes: null
  };
};

const validate = (fields) => {
  if (validator.isEmpty(fields.title || '')) {
    return { title: 'This is a required field.' };
  }
  return {};
};

const successPath = (props) => {
  return `/iterations/${props.location.state.iterationId}/open`;
};

const submit = (props, fields) => {
  if (props.lookup) {
    return API.updateTask(fields);
  } else {
    return API.createTask(fields);
  }
};

const title = (props) => {
  return props.lookup ? 'Edit Task' : 'New Task';
};

export default withForm(TaskForm, title, fields, validate, submit, successPath);
