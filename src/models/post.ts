export interface Post {
  id: string;
  body?: string;
  excerpt?: string;
  slug: string;
  tag: Tag;
  title: string;
  _createdAt: string;
}

export interface Tag {
  name: string;
}
