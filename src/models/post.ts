export interface Post {
  id: string;
  title: string;
  excerpt?: string;
  slug: string;
  tag: Tag;
  _createdAt: string;
}

export interface Tag {
  name: string;
}
