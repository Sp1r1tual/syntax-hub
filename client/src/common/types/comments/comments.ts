export interface IImage {
  id: string;
  order: number;
  src: string;
}

export interface ICommentData {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  text: string;
  createdAt: Date;
  editedAt?: Date;
  deletedAt?: Date;
  likes: number;
  images: IImage[];
  replies: ICommentData[];
}

export interface ISendComment {
  questionId: string;
  text: string;
  images?: File[];
}

export interface IEditComment {
  text: string;
  images?: File[];
}
