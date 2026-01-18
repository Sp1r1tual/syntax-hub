export interface ICourseSeed {
  id: string;
  slug: string;
  title: string;
  description?: string;
  icon?: string;
  groupKey: string;
  order: number;
  topics: {
    id: string;
    title: string;
    order: number;
    questions: {
      id: string;
      text: string;
      order: number;
      content: string;
    }[];
  }[];
}
