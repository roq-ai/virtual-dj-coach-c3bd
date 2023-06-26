import { CourseInterface } from 'interfaces/course';
import { CategoryInterface } from 'interfaces/category';
import { GetQueryInterface } from 'interfaces';

export interface CourseCategoryInterface {
  id?: string;
  course_id: string;
  category_id: string;
  created_at?: any;
  updated_at?: any;

  course?: CourseInterface;
  category?: CategoryInterface;
  _count?: {};
}

export interface CourseCategoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  course_id?: string;
  category_id?: string;
}
