import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../Page/PageHeader';
import FormActions from '../Form/FormActions';
import { Link } from 'react-router-dom';

class IterationDelete extends React.Component {

  render() {
    return (
      <div className={'scene-container -slim'}>
        <PageHeader title={this.props.title}/>
        <h2>Are you sure you want to delete this iteration?</h2>
        <form onSubmit={this.props.onSubmit}>
          <FormActions>
            <button className={'-danger'} type={'submit'}>Yes, delete this iteration</button>
            <Link className={'button'} to={`/releases/${this.props.fields.releaseId}/open`}>Nevermind</Link>
          </FormActions>
        </form>
      </div>
    );
  }

}

IterationDelete.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  errors: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default IterationDelete;
