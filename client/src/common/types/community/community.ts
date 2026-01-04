import { ITextBlock, IImageBlock, IListBlock } from "../index";

export type NewsContentBlockType = ITextBlock | IImageBlock | IListBlock;

export interface INewsResponse {
  id: string;
  title: string;
  likes: number;
  liked: boolean;
  content: NewsContentBlockType[];
  createdAt: Date;
}
