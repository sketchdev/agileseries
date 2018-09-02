import React from 'react';

const FormActions = props => {
  return (
    <div className={'form-actions'}>
      {props.children}
    </div>
  );
};

export default FormActions;
