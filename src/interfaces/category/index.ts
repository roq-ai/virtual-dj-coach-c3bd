import { CourseCategoryInterface } from 'interfaces/course-category';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CategoryInterface {
  id?: string;
  name: string;
  administrator_id: string;
  created_at?: any;
  updated_at?: any;
  course_category?: CourseCategoryInterface[];
  user?: UserInterface;
  _count?: {
    course_category?: number;
  };
}

export interface CategoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  administrator_id?: string;
}
