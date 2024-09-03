export interface Author {
  id: number;
  name: string;
  bio: string;
}

export interface Book {
  id: number;
  title: string;
  synopsis: string;
  authorId: number;
  publishedDate: Date;
  coverImage: string;
}
