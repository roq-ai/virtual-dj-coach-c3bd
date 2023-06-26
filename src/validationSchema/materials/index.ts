import * as yup from 'yup';

export const materialValidationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  course_id: yup.string().nullable().required(),
  content_creator_id: yup.string().nullable().required(),
});
