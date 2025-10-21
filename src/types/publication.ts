export type Publication = {
  id: number;
  title: string;
  author: string;
  cover: string;
  category: string;
  views: number;
  pages: number;
  uploadDate: string;
  pageImages?: string[];
};
