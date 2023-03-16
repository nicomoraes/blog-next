export const CONTACTPAGE_QUERY = `query ContactPageQuery {
  allSocialMds(filter: {visible: {eq: "true"}}) {
    id
    link
    logo {
      url
    }
    name
  }
}
`