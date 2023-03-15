export const POSTPAGE_QUERY = (slug: string) => `query PostQuery {
  post(filter: {slug: {eq: "${slug}"}, visible: {eq: "true"}}) {
    slug
    title
    excerpt
    body
    tag {
      name
    }
  }
}
`

export const STATIC_GEN_POSTPAGE_QUERY = `query GetPostsSlugQuery {
  allPosts(filter: {visible: {eq: "true"}}) {
    slug
  }
}
`;