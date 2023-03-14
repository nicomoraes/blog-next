export const HOMEPAGE_QUERY = `query HomePageQuery {
  myinfo {
    photo {
      url
    }
    role
    phrase
  }
  allSocialMds {
    id
    name
    link
    logo {
      url
    }
  }
  allTechnologies(filter: {visible: {eq: "true"}}) {
    id
    name
    logo {
      url
    }
  }
  allRepositories(filter: {isVisible: {eq: "true"}})  {
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
  allPosts(filter: {visible: {eq: "true"}}) {
    id
    title
    slug
    tag {
      name
    }
    _createdAt
  }
}
` 