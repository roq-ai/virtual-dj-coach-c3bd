import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createCourseCategory } from 'apiSdk/course-categories';
import { Error } from 'components/error';
import { courseCategoryValidationSchema } from 'validationSchema/course-categories';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { CourseInterface } from 'interfaces/course';
import { CategoryInterface } from 'interfaces/category';
import { getCourses } from 'apiSdk/courses';
import { getCategories } from 'apiSdk/categories';
import { CourseCategoryInterface } from 'interfaces/course-category';

function CourseCategoryCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CourseCategoryInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCourseCategory(values);
      resetForm();
      router.push('/course-categories');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CourseCategoryInterface>({
    initialValues: {
      course_id: (router.query.course_id as string) ?? null,
      category_id: (router.query.category_id as string) ?? null,
    },
    validationSchema: courseCategoryValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Course Category
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<CourseInterface>
            formik={formik}
            name={'course_id'}
            label={'Select Course'}
            placeholder={'Select Course'}
            fetcher={getCourses}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.title}
              </option>
            )}
          />
          <AsyncSelect<CategoryInterface>
            formik={formik}
            name={'category_id'}
            label={'Select Category'}
            placeholder={'Select Category'}
            fetcher={getCategories}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'course_category',
  operation: AccessOperationEnum.CREATE,
})(CourseCategoryCreatePage);
