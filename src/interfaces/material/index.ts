import { CourseInterface } from 'interfaces/course';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface MaterialInterface {
  id?: string;
  title: string;
  content: string;
  course_id: string;
  content_creator_id: string;
  created_at?: any;
  updated_at?: any;

  course?: CourseInterface;
  user?: UserInterface;
  _count?: {};
}

export interface MaterialGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  content?: string;
  course_id?: string;
  content_creator_id?: string;
}
