import type { Post } from '../post';

export interface IBlogPageQuery {
  data: Data;
}

export interface Data {
  allPosts: Required<Post[]>;
}
