import { CourseCategoryInterface } from 'interfaces/course-category';
import { MaterialInterface } from 'interfaces/material';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CourseInterface {
  id?: string;
  title: string;
  description: string;
  instructor_id: string;
  created_at?: any;
  updated_at?: any;
  course_category?: CourseCategoryInterface[];
  material?: MaterialInterface[];
  user?: UserInterface;
  _count?: {
    course_category?: number;
    material?: number;
  };
}

export interface CourseGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  instructor_id?: string;
}
