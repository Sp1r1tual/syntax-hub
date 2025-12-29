export interface IQuestion {
  id: string;
  text: string;
}

export interface ITopic {
  id: string;
  title: string;
  questions: IQuestion[];
}

export interface ICourse {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryTitle: string;
  icon: string;
  topics?: ITopic[];
}
