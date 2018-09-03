import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../Page/PageHeader';
import FormActions from '../Form/FormActions';
import { Link } from 'react-router-dom';

class StoryDelete extends React.Component {

  render() {
    return (
      <div className={'scene-container -slim'}>
        <PageHeader title={this.props.title}/>
        <h2>Are you sure you want to delete this story?</h2>
        <form onSubmit={this.props.onSubmit}>
          <FormActions>
            <button className={'-danger'} type={'submit'}>Yes, delete this story</button>
            <Link className={'button'} to={`/iterations/${this.props.fields.iterationId}/open`}>Nevermind</Link>
          </FormActions>
        </form>
      </div>
    );
  }

}

StoryDelete.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.shape({
    id: PropTypes.string,
    iterationId: PropTypes.string,
  }),
  errors: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default StoryDelete;
