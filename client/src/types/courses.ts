export type Question = {
  id: string;
  text: string;
};

export type Topic = {
  id: string;
  title: string;
  questions: Question[];
};

export type Course = {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryTitle: string;
  icon: string;
  topics?: Topic[];
};
