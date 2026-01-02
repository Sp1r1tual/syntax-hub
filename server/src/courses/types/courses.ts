export interface IContentBlockData {
  id: string;
  type: string;
  content?: string;
  language?: string;
  src?: string;
  alt?: string | null;
  caption?: string | null;
  title?: string | null;
  headers?: string[];
  rows?: string[][];
}
