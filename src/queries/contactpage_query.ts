export const CONTACTPAGE_QUERY = `query ContactPageQuery {
  allSocialMds(filter: {visibleInContact: {eq: "true"}}) {
    id
    islink
    link
    logo {
      url
    }
    name
  }
}
`;
