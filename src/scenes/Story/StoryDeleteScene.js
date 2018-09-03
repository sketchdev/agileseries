import API from '../../lib/API';
import withForm from '../../hocs/withForm';
import StoryDelete from '../../components/Story/StoryDelete';

const fields = (props) => {
  return props.lookup.data;
};

const validate = (fields) => {
  return {};
};

const successPath = (props) => {
  return `/iterations/${props.lookup.data.iterationId}/open`;
};

const submit = (props, fields) => {
  return API.deleteStoryById(props.lookup.data.id);
};

const title = (props) => {
  return props.lookup.data.title;
};

export default withForm(StoryDelete, title, fields, validate, submit, successPath);
