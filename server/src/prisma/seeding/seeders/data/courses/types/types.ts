export interface ICourseSeed {
  slug: string;
  title: string;
  description?: string;
  icon?: string;
  groupKey: string;
  order: number;
  topics: {
    title: string;
    order: number;
    questions: {
      text: string;
      order: number;
      content: string;
    }[];
  }[];
}
