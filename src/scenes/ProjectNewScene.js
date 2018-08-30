import withFormScene from '../hocs/withFormScene';
import ProjectForm from '../components/ProjectForm';
import { allFieldsRequired } from '../lib/Validation';
import API from '../lib/API';

export default withFormScene(ProjectForm, 'New Project', { name: null, company: null }, null, allFieldsRequired, API.createProject, '/projects');
