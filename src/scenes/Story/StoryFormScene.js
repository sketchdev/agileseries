import StoryForm from '../../components/Story/StoryForm';
import API from '../../lib/API';
import withForm from '../../hocs/withForm';
import validator from 'validator';

const fields = (props) => {
  if (props.lookup) {
    return props.lookup.data;
  }
  return {
    backlogId: props.location.state.backlogId,
    iterationId: props.location.state.iterationId,
    name: null,
    points: null,
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
  const iterationId = (props.location.state || {}).iterationId || (props.lookup || { data: {} }).data.iterationId;
  const backlogId = (props.location.state || {}).backlogId || (props.lookup || { data: {} }).data.backlogId;
  if (iterationId) {
    return `/iterations/${iterationId}/open`;
  } else {
    return `/backlogs/${backlogId}/open`;
  }
};

const submit = (props, fields) => {
  if (props.lookup) {
    return API.updateStory(fields);
  } else {
    return API.createStory(fields);
  }
};

const title = (props) => {
  return props.lookup ? 'Edit Story' : 'New Story';
};

export default withForm(StoryForm, title, fields, validate, submit, successPath);
