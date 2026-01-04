import {
  ITextBlock,
  ICodeBlock,
  INoteBlock,
  ITableBlock,
  IImageBlock,
  IListBlock,
} from "../index";

export interface ICategoryGroup {
  key: string;
  title: string;
}

export interface ICourseAuthor {
  id: string;
  name: string | null;
}

export interface IQuestion {
  id: string;
  text: string;
  topicId: string;
}

export type ContentBlockType =
  | ITextBlock
  | ICodeBlock
  | INoteBlock
  | IImageBlock
  | ITableBlock
  | IListBlock;

export interface IQuestionDetail extends IQuestion {
  blocks: ContentBlockType[];
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
  author: ICourseAuthor | null;
  topics: ITopic[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICoursesListResponse {
  groups: IGroupCourses[];
}

export interface ICourseDetailsResponse {
  structure: ICourseNavigation;
  content: IQuestionDetail[];
}
