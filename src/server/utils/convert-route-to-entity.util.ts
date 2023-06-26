const mapping: Record<string, string> = {
  categories: 'category',
  courses: 'course',
  'course-categories': 'course_category',
  materials: 'material',
  schools: 'school',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
