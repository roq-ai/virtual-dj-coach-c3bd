import * as yup from 'yup';

export const categoryValidationSchema = yup.object().shape({
  name: yup.string().required(),
  administrator_id: yup.string().nullable().required(),
});
