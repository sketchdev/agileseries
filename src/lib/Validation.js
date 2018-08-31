import validator from 'validator';

// TODO: MAYBE MAKE A BUILDER TO CHAIN COMMON FIELD VALIDATION TOGETHER

export const allFieldsRequired = (fields) => {
  const errors = {};
  for (const field of Object.keys(fields)) {
    if (validator.isEmpty((fields[field] || '').toString())) {
      errors[field] = 'This field is required.'
    }
  }
  return errors;
};
