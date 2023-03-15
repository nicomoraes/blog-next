import { Post } from "../post"

export interface IPostPageQuery {
  data: Data;
}

interface Data {
  post: Post;
}

export interface IStaticGenParams {
  data: {
    allPosts: Pick<Post, "slug">[]
  }
}