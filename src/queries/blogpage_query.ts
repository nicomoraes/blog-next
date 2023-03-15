export const BLOGPAGE_QUERY = `query BlogPageQuery {
  allPosts(filter: {visible: {eq: "true"}}) {
    id
    slug
    title
    excerpt
    tag {
      name
    }
    _createdAt
  }
}
` 