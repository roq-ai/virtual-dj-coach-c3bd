import * as yup from 'yup';

export const courseCategoryValidationSchema = yup.object().shape({
  course_id: yup.string().nullable().required(),
  category_id: yup.string().nullable().required(),
});
