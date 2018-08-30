import validator from 'validator';

export const allFieldsRequired = (fields) => {
  const errors = {};
  for (const field of Object.keys(fields)) {
    if (validator.isEmpty((fields[field] || '').toString())) {
      errors[field] = 'This field is required.'
    }
  }
  return errors;
};
