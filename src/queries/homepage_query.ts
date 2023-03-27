export const HOMEPAGE_QUERY = `query HomePageQuery {
  myinfo {
    photo {
      url
    }
    role
    phrase
  }
  allSocialMds(filter: {visibleInHome: {eq: "true"}}) {
    id
    link
    logo {
      url
    }
    name
  }
  allTechnologies(filter: {visible: {eq: "true"}}) {
    id
    name
    logo {
      url
    }
  }
  allRepositories(filter: {visible: {eq: "true"}})  {
    id
    title
    description
    link
    techs {
      id
      logo{
        url
      }
    }
  }
  allPosts(filter: {published: {eq: "true"}}) {
    id
    title
    slug
    tag {
      name
    }
    _createdAt
  }
}
`;
