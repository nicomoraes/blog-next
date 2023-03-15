export interface Post {
  id: string;
  _createdAt: string;
  slug: string;
  tag: Tag;
  title: string;
  excerpt?: string;
  body?: string;
}

export interface Tag {
  name: string;
}