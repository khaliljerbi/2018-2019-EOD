import * as Yup from 'yup';

// field validation
export const validateInput = async (name, value, Schema) => {
  const obj = { [name]: value };
  console.log(name, Schema.fields);
  const subSchema = Yup.object().shape({ [name]: Schema.fields[name] });

  try {
    await subSchema.validate(obj);
  } catch (error) {
    return error;
  }
};

// async validation redux form
export const validator = schema => (formValues) => {
  try {
    schema.validateSync(formValues, { abortEarly: false });
    return {};
  } catch (err) {
    return err.inner.reduce(
      (errors, error) => ({
        ...errors,
        [error.path]: error.message,
      }),
      {},
    );
  }
};


// check if form is valid
export const validateForm = (data, Schema) => !Schema.isValidSync(data);
