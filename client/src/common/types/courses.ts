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

export interface ITextBlock {
  id: string;
  type: "TEXT";
  content: string;
}

export type CodeLanguageType =
  | "javascript"
  | "typescript"
  | "ts"
  | "html"
  | "css"
  | "json"
  | "bash"
  | "shell"
  | "markdown"
  | "yaml"
  | "sql"
  | "python"
  | "java"
  | "csharp";

export interface ICodeBlock {
  id: string;
  type: "CODE";
  language: CodeLanguageType;
  content: string;
}

export interface INoteBlock {
  id: string;
  type: "NOTE";
  content: string;
}

export interface IImageBlock {
  id: string;
  type: "IMAGE";
  src: string;
  alt?: string;
  caption?: string;
}

export interface ITableBlock {
  id: string;
  type: "TABLE";
  title: string;
  headers: string[];
  rows: string[][];
}

export type ContentBlockType =
  | ITextBlock
  | ICodeBlock
  | INoteBlock
  | IImageBlock
  | ITableBlock;

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
