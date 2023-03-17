export const POSTPAGE_QUERY = (slug: string) => `query PostQuery {
  post(filter: {slug: {eq: "${slug}"}, published: {eq: "true"}}) {
    body
    excerpt
    slug
    title
    tag {
      name
    }
    _createdAt
  }
}
`

export const STATIC_GEN_POSTPAGE_QUERY = `query GetPostsSlugQuery {
  allPosts(filter: {published: {eq: "true"}}) {
    slug
  }
}
`;