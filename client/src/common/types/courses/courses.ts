import { IUser } from "../auth/auth";

export interface ICategoryGroup {
  key: string;
  title: string;
}

export type CourseAuthorType = Omit<IUser, "roles">;

export type QuestionStatusType = "repeat" | "learned";

export interface IQuestion {
  id: string;
  text: string;
  topicId: string;
  status?: QuestionStatusType;
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
  courses: ICourseInGroup[];
}

export interface ICourseNavigation {
  slug: string;
  title: string;
  description: string | null;
  icon?: string;
  group: ICategoryGroup;
  authors: CourseAuthorType[];
  topics: ITopic[];
  createdAt: string;
  updatedAt: string;
}

export interface IQuestionDetail {
  id: string;
  text: string;
  content: string;
  topicId: string;
  status?: QuestionStatusType;
}

export interface ICoursesListResponse {
  groups: IGroupCourses[];
}

export interface ICourseDetailsResponse {
  structure: ICourseNavigation;
  content: IQuestionDetail[];
}

export interface IMarkQuestionResponse {
  questionId: string;
  status: QuestionStatusType;
  message?: string;
}
