import withFormScene from '../hocs/withFormScene';
import ProjectForm from '../components/ProjectForm';
import { allFieldsRequired } from '../lib/Validation';
import API from '../lib/API';

const lookup = async (params) => {
  return await API.findProjectById(params.id);
};

export default withFormScene(ProjectForm, 'Edit Project', { id: null, name: null, company: null }, lookup, allFieldsRequired, API.updateProject, '/projects');
