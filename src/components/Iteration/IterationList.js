import React from 'react';
import PropTypes from 'prop-types';
import IterationListItem from './IterationListItem';

const IterationList = props => {
  return (
    <div>
      {props.iterations.map(iteration => <IterationListItem key={iteration.id} id={iteration.id} name={iteration.name} notes={iteration.notes}/>)}
    </div>
  );
};

IterationList.propTypes = {
  iterations: PropTypes.array.isRequired,
};

export default IterationList;
