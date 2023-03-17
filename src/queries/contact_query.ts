export const CONTACTPAGE_QUERY = `query ContactPageQuery {
  allSocialMds(filter: {visibleInContact: {eq: "true"}}) {
    id
    link
    logo {
      url
    }
    name
  }
}
`