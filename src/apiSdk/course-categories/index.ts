import axios from 'axios';
import queryString from 'query-string';
import { CourseCategoryInterface, CourseCategoryGetQueryInterface } from 'interfaces/course-category';
import { GetQueryInterface } from '../../interfaces';

export const getCourseCategories = async (query?: CourseCategoryGetQueryInterface) => {
  const response = await axios.get(`/api/course-categories${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCourseCategory = async (courseCategory: CourseCategoryInterface) => {
  const response = await axios.post('/api/course-categories', courseCategory);
  return response.data;
};

export const updateCourseCategoryById = async (id: string, courseCategory: CourseCategoryInterface) => {
  const response = await axios.put(`/api/course-categories/${id}`, courseCategory);
  return response.data;
};

export const getCourseCategoryById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/course-categories/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCourseCategoryById = async (id: string) => {
  const response = await axios.delete(`/api/course-categories/${id}`);
  return response.data;
};
