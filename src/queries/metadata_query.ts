export const METADATA_QUERY = (page: string) => `query MyQuery {
  websiteInfo(filter: {pageTitle: {eq: "${page}"}}) {
    metatags {
      title
      description
      image {
        url
      }
      twitterCard
    }
  }
}` 