export interface ICategoryGroup {
  key: string;
  title: string;
  icon?: string;
}

export interface IQuestion {
  id: string;
  text: string;
  topicId: string;
}

export interface IQuestionDetail extends IQuestion {
  explanation: string;
}

export interface ITopic {
  id: string;
  title: string;
  questions: IQuestion[];
  courseId: string;
}

export interface ICoursePreview {
  slug: string;
  title: string;
  description: string | null;
  icon?: string;
}

export interface ICourseInGroup extends ICoursePreview {}

export interface IGroupCourses {
  key: string;
  title: string;
  icon?: string;
  courses: ICourseInGroup[];
}

export interface ICourseNavigation {
  slug: string;
  title: string;
  description: string | null;
  icon?: string;
  group: ICategoryGroup;
  topics: ITopic[];
}

export interface ICoursesListResponse {
  groups: IGroupCourses[];
}

export interface ICourseDetailsResponse {
  structure: ICourseNavigation;
  content: IQuestionDetail[];
}
