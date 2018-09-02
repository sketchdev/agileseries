import ProjectForm from '../../components/Project/ProjectForm';
import { allFieldsRequired } from '../../lib/Validation';
import API from '../../lib/API';
import withForm from '../../hocs/withForm';

const fields = (props) => {
  if (props.lookup) {
    return props.lookup.data;
  }
  return { name: null, company: null };
};

const successPath = (props) => {
  return '/projects';
};

const submit = (props, fields) => {
  if (props.lookup) {
    return API.updateProject(fields);
  } else {
    return API.createProject(fields);
  }
};

const title = (props) => {
  return props.lookup ? 'Edit Project' : 'New Project';
};

export default withForm(ProjectForm, title, fields, allFieldsRequired, submit, successPath);
