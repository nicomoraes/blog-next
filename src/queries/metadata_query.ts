export const METADATA_QUERY = (page: string) => `query MyQuery {
  websiteInfo(filter: {pageTitle: {eq: "${page}"}}) {
    metatags {
      description
      title
      twitterCard
      image {
        url
      }
    }
    keyword {
      name
    }
  }
}`;
